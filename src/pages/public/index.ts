import Elysia from "elysia";
import { SignInPage } from "./auth/signIn";
import { SignUpPage } from "./auth/singup";
import { homePage } from "./home";

export const publicPages = new Elysia({
	name: "@app/pages/public",
})
	.use(homePage)
	.use(SignInPage)
	.use(SignUpPage);
