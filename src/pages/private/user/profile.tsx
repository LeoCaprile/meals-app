import Elysia from "elysia";
import { TextInput } from "@/components/dataInput/Input";
import InputFile from "@/components/dataInput/InputFile";
import { Button } from "@/components/Button";
import { ctx } from "@/context";

export const ProfilePage = new Elysia()
	.use(ctx)
	.get("/user/profile", async ({ renderPage, session }) => {
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
						hx-on:after-request="this.reset()"
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

						<InputFile
							label="Profile picture"
							name="profilePicture"
							accept="image/jpeg, image/png"
						/>

						<Button type="submit">Save changes</Button>
					</form>
				</div>
			</div>
		);
	});
