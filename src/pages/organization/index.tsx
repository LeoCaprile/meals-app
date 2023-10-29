import Elysia from "elysia";
import { ctx } from "../../context";

export const orgPage = new Elysia({
	name: "@app/orgPage",
})
	.use(ctx)
	.get("/organization", (ctx) => {
		return ctx.renderPage(
			"organization",
			<div>
				<h1>Organization</h1>
				<p>Organization page</p>
			</div>
		);
	});
