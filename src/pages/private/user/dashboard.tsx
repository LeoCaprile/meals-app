import Elysia from "elysia";
import { ctx } from "@/context";
import { BasicLayout } from "@/layouts/Basic";
import Link from "@/components/Link";
import { Button } from "@/components/Button";

export const dashboardPage = new Elysia({
	name: "@app/dashboardPage",
})
	.use(ctx)
	.get("/dashboard", (ctx) => {
		if (!ctx.session) return;

		const userOrg = ctx.session.user.organization_id;

		return ctx.renderPage(
			"Dashboard",
			<BasicLayout title="Dashboard">
				<div>
					<h2 class="text-2xl">Organizations</h2>
					{userOrg ? (
						<>
							<div>organization</div>
							<p>{userOrg} </p>
						</>
					) : (
						<div>
							No organization
							<Button>
								<Link class="text-white" href="/organization/create">
									Create a organization
								</Link>
							</Button>
						</div>
					)}
				</div>
			</BasicLayout>
		);
	});
