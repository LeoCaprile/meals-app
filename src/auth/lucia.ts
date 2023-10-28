import { lucia } from "lucia";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { elysia } from "lucia/middleware";
import { google } from "@lucia-auth/oauth/providers";

import { client } from "../db";
import { env } from "../config";

const tableNames = {
	user: "user",
	session: "user_session",
	key: "user_key",
};

export const auth = lucia({
	env: "DEV",
	adapter: libsql(client, tableNames),
	middleware: elysia(),
	getUserAttributes: (data) => {
		return {
			name: data.name,
			picture: data.picture,
			email: data.email,
			id: data.id,
			organization_id: data.organization_id,
		};
	},
});

export type Auth = typeof auth;

export const googleAuth = google(auth, {
	clientId: env.GOOGLE_CLIENT_ID,
	clientSecret: env.GOOGLE_TOKEN,
	redirectUri: `${env.HOST_URL}api/auth/google/callback`,
});
