import Elysia from "elysia";
import { authController } from "./auth.controller";
import { userController } from "./user.controller";

export const controllers = new Elysia({
	name: "@app/controllers",
	prefix: "/api",
})
	.use(userController)
	.use(authController);
