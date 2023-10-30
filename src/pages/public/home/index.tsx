// route: /
import Elysia from "elysia";
import { ctx } from "@/context";
import { redirect } from "@/lib";

export const homePage = new Elysia({ name: "@app/pages" })
	.use(ctx)
	.get("/", async ({ renderPage, session, set, headers }) => {
		if (session) {
			redirect({ set, headers }, "/dashboard");
			return;
		}

		return renderPage(
			"Home",
			<div class="grid place-content-center w-full h-full">
				<div class="flex flex-col items-center gap-5">
					<h2 class="text-4xl font-bold">
						Welcome to meals-app, try sign in or sign up to access to the app
					</h2>
					<h3 class="text-2xl flex gap-2">
						<a class="text-blue-6" href="/signIn">
							Sign in
						</a>
						/
						<a class="text-blue-6" href="/signUp">
							Sign up
						</a>
					</h3>
				</div>
			</div>
		);
	});
