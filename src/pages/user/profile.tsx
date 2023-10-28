import Elysia from "elysia";
import { TextInput } from "../../components/Input";
import { Button } from "../../components/Button";
import { ctx } from "../../context";
import { protectedRoute } from "../../auth/protectedRoute";

export const ProfilePage = new Elysia().use(ctx).get(
	"/user/profile",
	async ({ renderPage, session }) => {
		if (session === null) return;

		const user = session.user;

		return renderPage(
			"Profile",
			<div class="grid place-content-center h-100vh">
				<div class="flex flex-col gap-5 p-5 b-2 w-300px b-coolGray-2 rounded">
					<h1 class="text-center text-2xl">Your profile</h1>
					<p class="text-center text-coolGray-500">
						You can change your name here and add a picture.
					</p>

					<form
						hx-put="/api/user/profile"
						hx-swap="none"
						class="flex flex-col"
						enctype="multipart/form-data"
					>
						<TextInput
							label="Email"
							placeholder="type here..."
							name="email"
							type="text"
							value={user.email}
							disabled
						/>
						<TextInput
							label="Name"
							placeholder="type here..."
							name="name"
							type="text"
							value={user.name}
						/>

						<div>
							<label
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								for="small_size"
							>
								Profile picture
							</label>
							<input
								name="profilePicture"
								class="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
								type="file"
								accept="image/png, image/jpeg"
							/>
						</div>

						<Button type="submit">Save changes</Button>
					</form>
				</div>
			</div>
		);
	},
	protectedRoute
);
