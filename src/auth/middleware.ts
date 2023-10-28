import { auth } from "./lucia";
import Elysia from "elysia";

export const authed = new Elysia({
	name: "@app/auth",
})
	.decorate("auth", auth)
	.derive(async (ctx) => {
		const authRequest = ctx.auth.handleRequest(ctx);
		const session = await authRequest.validate();
		return { session };
	});
