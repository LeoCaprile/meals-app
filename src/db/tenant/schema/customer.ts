import { integer, real, text } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { cart } from "./cart";

export const customerLocation = sqliteTable("customer_location", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	google_id: text("google_id").notNull(),
	name: text("name").notNull(),
	lat: real("lat").notNull(),
	lng: real("lng").notNull(),
});

export const customer = sqliteTable("customer", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	active_cart_id: integer("active_cart_id", { mode: "number" })
		.notNull()
		.references(() => cart.id),
	name: text("name").notNull(),
	email: text("email").notNull(),
	phone: integer("phone").notNull(),
	location_id: text("location_id")
		.notNull()
		.references(() => customerLocation.id, { onDelete: "cascade" }),
});
