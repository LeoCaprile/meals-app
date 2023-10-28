import { integer, primaryKey } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { product } from "./products";

export const cart = sqliteTable("cart", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	customer_id: integer("customer_id", { mode: "number" }).notNull(),
	expires_at: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
	is_checkout: integer("is_checkout", { mode: "boolean" }).default(false),
});

export const cartItem = sqliteTable(
	"cart_item",
	{
		cart_id: integer("cart_id", { mode: "number" })
			.notNull()
			.references(() => cart.id, { onDelete: "cascade" }),
		product_id: integer("product_id", { mode: "number" })
			.notNull()
			.references(() => product.id, { onDelete: "cascade" }),
		quantity: integer("quantity", { mode: "number" }).notNull(),
	},
	(cartItemTable) => ({
		pk: primaryKey(cartItemTable.cart_id, cartItemTable.product_id),
	})
);
