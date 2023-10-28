// route: /
import Elysia from "elysia";
import { ctx } from "../../context";

export const homePage = new Elysia({ name: "@app/pages" })
	.use(ctx)
	.get("/", async ({ renderPage }) => {
		return renderPage(
			"Home",
			<div class="grid place-content-center w-full h-full">
				<div class="flex flex-col items-center gap-5">
					<h2 class="text-4xl font-bold">
						This was built with htm<span class="text-blue-6">x</span> and
						elysiajs
					</h2>
					<h3 class="text-2xl">
						Try to{" "}
						<a class="text-blue-6" href="/signIn">
							sign in
						</a>{" "}
						to access to the app
					</h3>

					<div class="i-logos-bun text-8xl" />
				</div>
			</div>
		);
	});
