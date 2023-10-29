import { integer, text } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const org = sqliteTable("org", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	picture: text("picture").notNull(),
	email: text("email").notNull(),
	currency: text("currency").notNull(),
	country_code: text("country_code").notNull(),
	phone_code: text("phone_code").notNull(),
	db_name: text("db_name").notNull(),
	db_auth_token: text("db_auth_token").notNull(),
});

export const orgUserRole = sqliteTable("org_user_role", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	role: text("role").notNull(),
});
