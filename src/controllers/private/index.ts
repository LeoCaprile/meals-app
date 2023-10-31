import { ctx } from "@/context";
import Elysia from "elysia";
import { userController } from "./user.controller";
import { PrivateControllerError } from "./errors";

export const privateControllers = new Elysia({
	name: "@app/pages/private",
})
	.use(ctx)
	.group(
		"",
		{
			beforeHandle: ({ session }) => {
				if (!session) {
					throw new PrivateControllerError(
						"You must be logged in to access this controller"
					);
				}
			},
		},
		(privatedPages) => privatedPages.use(userController)
	);
