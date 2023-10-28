import Elysia from "elysia";
import { homePage } from "./home";
import { todoPage } from "./todos";
import { SignInPage } from "./auth/signIn";
import { SignUpPage } from "./auth/singup";
import { ProfilePage } from "./user/profile";

export const pages = new Elysia({
	name: "@app/pages",
})
	.use(homePage)
	.use(ProfilePage)
	.use(SignUpPage)
	.use(SignInPage)
	.use(todoPage);
