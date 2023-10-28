import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./primary";
import { env } from "../config";

export const client = createClient({
	url: env.DB_URI,
	authToken: env.DB_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
