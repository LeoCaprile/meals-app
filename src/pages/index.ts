import Elysia from "elysia";

import { privatePages } from "./private";
import { publicPages } from "./public";

export const pages = new Elysia({
	name: "@app/pages",
})
	.use(privatePages)
	.use(publicPages);
