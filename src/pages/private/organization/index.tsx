import Elysia from "elysia";
import { ctx } from "../../../context";
import { redirect } from "@/lib";
import { BasicLayout } from "@/layouts/Basic";
import { TextInput } from "@/components/Input";
import { Button } from "@/components/Button";

export const orgPage = new Elysia({
	name: "@app/orgPage",
})
	.use(ctx)
	.get("/organization/:id", ({ session, set, headers, renderPage, params }) => {
		if (!session) return;
		const userOrg = session.user.organization_id;

		if (!userOrg && !params.id) {
			redirect({ set, headers }, "/dashboard");
		}

		return renderPage(
			"organization",
			<div>
				<h1>Organization page</h1>
				<p>Organization page</p>
			</div>
		);
	})
	.get("/organization/create", (ctx) => {
		return ctx.renderPage(
			"organization",
			<BasicLayout title="Create organization">
				<div class="grid place-content-center">
					<div class="flex flex-col gap-5 p-5 b-2 b-coolGray-2 rounded">
						<form
							hx-post="/api/auth/singin"
							hx-swap="none"
							class="flex flex-col"
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
								type="text"
							/>
							<TextInput
								label="Phone"
								placeholder="type here..."
								name="phone"
								type="tel"
							/>

							<label
								for="countries"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Select an option
							</label>
							<select
								id="countries"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							>
								<option selected>Choose a country</option>
								<option value="CL">Chile</option>
								<option value="AR">Argentina</option>
								<option value="PE">Perú</option>
								<option value="UR">Uruguay</option>
							</select>

							<label
								class="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
								for="file_input"
							>
								Logo
							</label>
							<input
								class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
								id="file_input"
								type="file"
							/>

							<label
								class="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
								for="file_input"
							>
								Banner
							</label>
							<input
								class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
								id="file_input"
								type="file"
							/>

							<Button type="submit">Create</Button>
						</form>
					</div>
				</div>
			</BasicLayout>
		);
	});
