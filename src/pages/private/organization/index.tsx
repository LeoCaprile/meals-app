import Elysia from "elysia";
import { ctx } from "../../../context";
import { redirect } from "@/lib";
import { BasicLayout } from "@/layouts/Basic";
import { TextInput } from "@/components/dataInput/Input";
import { Button } from "@/components/Button";
import InputFile from "@/components/dataInput/InputFile";

export const orgPage = new Elysia({
	name: "@app/orgPage",
})
	.use(ctx)
	.get("/organization/:id", ({ session, set, headers, renderPage }) => {
		if (!session) return;
		const userOrg = session.user.organization_id;

		if (!userOrg) {
			redirect({ set, headers }, "/dashboard");
			return;
		}

		return renderPage(
			"organization",
			<BasicLayout title="Org">
				<h1>Organization page</h1>
				<p>Organization page</p>
			</BasicLayout>
		);
	})
	.get("/organization/create", (ctx) => {
		return ctx.renderPage(
			"organization",
			<BasicLayout title="Create organization">
				<div class="grid place-content-center">
					<div class="flex flex-col gap-5 p-5 b-2 b-coolGray-2 rounded">
						<form
							hx-post="/api/organization/create"
							hx-swap="none"
							class="flex flex-col"
							enctype="multipart/form-data"
						>
							<TextInput
								label="Name"
								placeholder="type here..."
								name="name"
								type="text"
							/>
							<TextInput
								label="Email"
								placeholder="type here..."
								name="email"
								type="email"
							/>
							<TextInput
								label="Phone"
								placeholder="example: 912341234"
								name="phone"
								type="tel"
								pattern="^[0-9]{9}$"
							/>

							<label
								for="countries"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Choose country
							</label>
							<select
								required="true"
								id="countries"
								name="countryCode"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							>
								<option value="CL">Chile</option>
								<option value="AR">Argentina</option>
								<option value="PE">Perú</option>
								<option value="UR">Uruguay</option>
							</select>

							<InputFile
								label="Logo"
								name="logo"
								accept="image/png, image/jpeg"
							/>

							<InputFile
								label="Banner"
								name="banner"
								accept="image/png, image/jpeg"
							/>

							<Button loading className="mt-5" type="submit">
								Create
							</Button>
						</form>
					</div>
				</div>
			</BasicLayout>
		);
	});
