import Elysia from "elysia";
import { authController } from "./auth/auth.controller";

export const publicControllers = new Elysia({
	name: "@app/publicController",
}).use(authController);
