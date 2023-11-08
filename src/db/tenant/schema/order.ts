import { integer } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { cart } from "./cart";
import { customer } from "./customer";

export const order = sqliteTable("order", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	cartId: integer("cart_id", { mode: "number" })
		.notNull()
		.unique()
		.references(() => cart.id),
	customerId: integer("customer_id", { mode: "number" })
		.notNull()
		.references(() => customer.id),
	isPaid: integer("is_paid", { mode: "boolean" }).default(false),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});
