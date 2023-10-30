import Elysia from "elysia";
import { orgPage } from "./organization";
import { dashboardPage } from "./user/dashboard";
import { ProfilePage } from "./user/profile";
import { ctx } from "@/context";
import { protectedRoute } from "@/auth/protectedRoute";

export const privatePages = new Elysia({
	name: "@app/pages/private",
})
	.use(ctx)
	.group("", protectedRoute, (privatedPages) =>
		privatedPages.use(orgPage).use(dashboardPage).use(ProfilePage)
	);
