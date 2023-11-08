import { ctx } from "@/context";
import to from "await-to-js";
import Elysia, { t } from "elysia";
import { generate } from "short-uuid";
import { OrganizationControllerError } from "../errors";
import { pushToTenantDb } from "@/db/tenant/pushDB";
import { org, user } from "@/db/primary";
import { countryCodes } from "@/lib/countryCodes";
import { eq } from "drizzle-orm";
import { redirect } from "@/lib";
import { env } from "@/config";

export const orgController = new Elysia({
	name: "@app/controllers/private/org",
})
	.use(ctx)
	.post(
		"/organization/create",
		async ({ turso, body, db, set, headers, session, log }) => {
			if (!session) return;

			const dbName = "org-" + generate().toString().toLowerCase();

			const url = "https://api.turso.tech/v1/databases";
			const options = {
				method: "POST",
				headers: {
					Authorization: "Bearer " + env.TURSO_API_KEY,
					"content-type": "application/json",
				},
				body: `{"name":"${dbName}","group":"default","image":"latest"}`,
			};

			const [createDbErr, tenantDB] = await to(
				fetch(url, options).then((res) => res.json())
			);

			console.log(await turso.organization.list());

			console.log(tenantDB);

			if (createDbErr)
				throw new OrganizationControllerError(
					"Failed to create org database " + createDbErr
				);

			const [createDBTokenErr, token] = await to(
				turso.logicalDatabases.mintAuthToken(
					"leocaprile",
					tenantDB?.database?.Name
				)
			);

			if (createDBTokenErr)
				throw new OrganizationControllerError(
					"Failed to create org database token"
				);

			const [pushToTenantDbErr] = await to(
				pushToTenantDb({
					dbName,
					authToken: token.jwt,
					input: true,
				})
			);

			if (pushToTenantDbErr)
				throw new OrganizationControllerError("Failed to push to tenant db");

			const countryInfo = countryCodes.find(
				(country) => country.countryCode === body.countryCode
			);

			if (countryInfo === undefined)
				throw new OrganizationControllerError("Invalid country code");

			const [createOrgRowErr, newOrg] = await to(
				db
					.insert(org)
					.values({
						name: body.name,
						db_name: tenantDB.database.Name,
						db_auth_token: token.jwt,
						country_code: countryInfo.countryCode,
						picture: "",
						email: body.email,
						currency: countryInfo.currency,
						phone_code: countryInfo.phoneCode,
					})
					.returning({
						id: org.id,
					})
			);

			if (createOrgRowErr || !newOrg[0])
				throw new OrganizationControllerError("Failed to create org row");

			const [addOrgToUserErr] = await to(
				db
					.update(user)
					.set({
						organizationId: newOrg[0].id,
					})
					.where(eq(user.id, session.user.id))
			);

			if (addOrgToUserErr)
				throw new OrganizationControllerError("Failed to add org to user");

			log.info("Created org " + body.name + " with db " + dbName);

			redirect({ set, headers }, "/dashboard");
		},
		{
			body: t.Object({
				name: t.String(),
				email: t.String(),
				phone: t.String(),
				countryCode: t.String({ minLength: 2, maxLength: 2 }),
				logo: t.File(),
				banner: t.File(),
			}),
		}
	);
