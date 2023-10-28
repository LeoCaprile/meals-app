import { integer, real, text } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const location = sqliteTable("location", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	googleId: text("googleId").notNull(),
	lat: real("lat").notNull(),
	lng: real("lng").notNull(),
	name: text("name").notNull(),
});

// this table has to be fill with data on creation of the db
export const social_type = sqliteTable("social_type", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	url: text("url").notNull(),
});

export const social = sqliteTable("social", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	social_id: integer("social_id", { mode: "number" })
		.notNull()
		.references(() => social_type.id),
	url: text("url").notNull(),
});

export const phone = sqliteTable("phone", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	phone: integer("phone").notNull(),
});

export const offline_payment_method = sqliteTable("offline_payment_method", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	is_active: integer("is_active", { mode: "boolean" }).notNull(),
});

export const online_payment_method = sqliteTable("online_payment_method", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	is_active: integer("is_active", { mode: "boolean" }).notNull(),
});
