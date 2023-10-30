import { BaseHTML } from "../components/baseHTML";
import { html as htmlPlugin } from "@elysiajs/html";
import Elysia from "elysia";
import { db } from "../db";
import { authed } from "../auth/middleware";
import { Navbar } from "../components/Navbar";
import { utapi } from "../db/files/uploadthing";
import { loggerPlugin } from "./logger";
import { TursoClient } from "beth-stack/turso";
import { env } from "../config";

const turso = new TursoClient(env.TURSO_API_KEY);

export const ctx = new Elysia({
	name: "@app/ctx",
})
	.use(htmlPlugin())
	.use(loggerPlugin)
	.use(authed)
	.decorate("turso", turso)
	.decorate("utapi", utapi)
	.decorate("db", db)
	.derive((ctx) => {
		const renderPage = (title: string, children: JSX.Element) =>
			ctx.html(
				<BaseHTML title={title}>
					<Navbar session={ctx.session} />
					{children}
				</BaseHTML>
			);
		return { renderPage };
	});
