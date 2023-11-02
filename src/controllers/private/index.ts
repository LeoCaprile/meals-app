import { ctx } from "@/context";
import Elysia from "elysia";
import { userController } from "./user/user.controller";
import { PrivateControllerError } from "./errors";
import { orgController } from "./org/org.controller";

export const privateControllers = new Elysia({
	name: "@app/pages/private",
})
	.use(ctx)
	.guard(
		{
			beforeHandle: ({ session }) => {
				if (!session) {
					throw new PrivateControllerError(
						"You must be logged in to access this controller"
					);
				}
			},
		},
		(privatedPages) => privatedPages.use(userController).use(orgController)
	);
