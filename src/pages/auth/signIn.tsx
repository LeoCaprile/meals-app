import Elysia from "elysia";
import { ctx } from "../../context";
import { TextInput } from "../../components/Input";
import { Button } from "../../components/Button";
import { GoogleButton } from "../../components/GoogleButton";

export const SignInPage = new Elysia()
	.use(ctx)
	.get("/signIn", ({ session, renderPage, set }) => {
		if (session) {
			set.redirect = "/";
			return;
		}

		return renderPage(
			"Sign Up",
			<div class="grid place-content-center h-100vh">
				<div class="flex flex-col gap-5 p-5 b-2 b-coolGray-2 rounded">
					<h1 class="text-center text-2xl">Sign In</h1>

					<form hx-post="/api/auth/singin" hx-swap="none" class="flex flex-col">
						<TextInput
							label="Email"
							placeholder="type here..."
							name="email"
							type="text"
						/>
						<TextInput
							label="Password"
							placeholder="type here..."
							name="password"
							type="password"
						/>
						<Button type="submit">Sign In</Button>
					</form>

					<a class="flex flex-col" href="api/auth/login/google">
						<GoogleButton />
					</a>
				</div>
			</div>
		);
	});
