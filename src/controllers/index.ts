import Elysia from "elysia";
import { privateControllers } from "./private";
import { publicControllers } from "./public";

export const controllers = new Elysia({
	name: "@app/controllers",
	prefix: "/api",
})
	.use(privateControllers)
	.use(publicControllers);
