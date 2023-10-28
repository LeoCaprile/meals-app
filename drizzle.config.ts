import type { Config } from "drizzle-kit";
import { env } from "./src/config";

export default {
	schema: "./src/db/schema/index.ts",
	out: "./drizzle",
	driver: "turso",
	dbCredentials: {
		url: env.DB_URI,
		authToken: env.DB_AUTH_TOKEN,
	},
	verbose: true,
	strict: true,
} satisfies Config;
