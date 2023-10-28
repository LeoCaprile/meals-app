import Elysia, { t } from "elysia";
import { ctx } from "../context";
import { redirect } from "../lib";
import { googleAuth } from "../auth/lucia";
import { parseCookie, serializeCookie } from "lucia/utils";
import { env } from "../config";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { LuciaError } from "lucia";
import { generateFromEmail } from "unique-username-generator";

export const authController = new Elysia({ name: "@app/auth", prefix: "/auth" })
	.use(ctx)
	.get("/getSession", ({ session }) => {
		if (!session) {
			return null;
		}
		return (
			<>
				<div safe>Logged as {session.user.name}</div>
				<img class="rounded-999 w-10 b-black b-1" src={session.user.picture} />
			</>
		);
	})
	.post(
		"/singin",
		async (ctx) => {
			ctx.log.info("Signin");
			const authRequest = ctx.auth.handleRequest(ctx);
			const session = await authRequest.validate();
			if (session) {
				redirect(
					{
						set: ctx.set,
						headers: ctx.headers,
					},
					"/"
				);
				return;
			}

			const { email, password } = ctx.body as {
				email: string;
				password: string;
			};

			try {
				const key = await ctx.auth.useKey("email", email, password);
				const user = await ctx.auth.getUser(key.userId);

				const session = await ctx.auth.createSession({
					userId: user.userId,
					attributes: {},
				});
				const sessionCookie = ctx.auth.createSessionCookie(session);

				ctx.set.headers["Set-Cookie"] = sessionCookie.serialize();
				redirect(
					{
						set: ctx.set,
						headers: ctx.headers,
					},
					"/todos"
				);

				ctx.log.info("Signin successful");
			} catch (e) {
				if (e instanceof LuciaError && e.message === "AUTH_INVALID_KEY_ID") {
					ctx.log.error(e);
				}
				if (e instanceof LuciaError && e.message === "AUTH_INVALID_PASSWORD") {
					ctx.log.error(e);
				}
			}
		},
		{
			body: t.Object({
				email: t.String(),
				password: t.String(),
			}),
		}
	)
	.post(
		"/signup",
		async (ctx) => {
			const authRequest = ctx.auth.handleRequest(ctx);
			const session = await authRequest.validate();

			if (session) {
				redirect(
					{
						set: ctx.set,
						headers: ctx.headers,
					},
					"/"
				);
				return;
			}

			const { email, password } = ctx.body;

			try {
				const user = await ctx.auth.createUser({
					key: {
						providerId: "email",
						providerUserId: email,
						password,
					},
					attributes: {
						email,
						name: generateFromEmail(email, 3),
						picture: "",
					},
				});

				const session = await ctx.auth.createSession({
					userId: user.userId,
					attributes: {},
				});
				const sessionCookie = ctx.auth.createSessionCookie(session);

				ctx.set.headers["Set-Cookie"] = sessionCookie.serialize();
				redirect(
					{
						set: ctx.set,
						headers: ctx.headers,
					},
					"/todos"
				);
			} catch (e) {
				if (e instanceof LuciaError && e.message === "AUTH_DUPLICATE_KEY_ID") {
					console.error(e);
				}
			}
		},
		{
			body: t.Object({
				email: t.String(),
				password: t.String(),
			}),
		}
	)

	.get("/signout", async (ctx) => {
		const authRequest = ctx.auth.handleRequest(ctx);
		const session = await authRequest.validate();

		if (!session) {
			redirect(
				{
					set: ctx.set,
					headers: ctx.headers,
				},
				"/"
			);
			return;
		}

		await ctx.auth.invalidateSession(session.sessionId);

		const sessionCookie = ctx.auth.createSessionCookie(null);

		ctx.set.headers["Set-Cookie"] = sessionCookie.serialize();
		redirect(
			{
				set: ctx.set,
				headers: ctx.headers,
			},
			"/"
		);
	})
	.get("/login/google", async ({ set }) => {
		const [url, state] = await googleAuth.getAuthorizationUrl();

		const state_cookie = serializeCookie("google_auth_state", state, {
			maxAge: 60 * 60,
			httpOnly: true,
			secure: env.NODE_ENV === "production",
			path: "/",
		});

		set.headers["Set-Cookie"] = state_cookie;

		set.redirect = url.toString();
	})
	.get("/google/callback", async ({ set, query, headers, auth }) => {
		const { state, code } = query;

		const cookies = parseCookie(headers["cookie"] || "");
		const state_cookie = cookies["google_auth_state"];

		if (!state_cookie || !state || state_cookie !== state || !code) {
			set.status = "Unauthorized";
			return;
		}

		try {
			const { createUser, getExistingUser, googleUser } =
				await googleAuth.validateCallback(code);

			const getUser = async () => {
				const existingUser = await getExistingUser();

				if (existingUser) {
					return existingUser;
				}

				const user = await createUser({
					attributes: {
						name: googleUser.name,
						email: googleUser.email ?? "",
						picture: googleUser.picture,
					},
				});

				return user;
			};

			const user = await getUser();
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			});
			const sessionCookie = auth.createSessionCookie(session);

			set.headers["Set-Cookie"] = sessionCookie.serialize();
			redirect(
				{
					set,
					headers,
				},
				"/todos"
			);
		} catch (e) {
			console.error(e, "Error signing in with Google");
			if (e instanceof OAuthRequestError) {
				set.status = "Unauthorized";
				return;
			} else {
				set.status = "Internal Server Error";
				return;
			}
		}
	});
