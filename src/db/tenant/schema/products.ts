import { integer, primaryKey, text } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const product = sqliteTable("product", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	description: text("description"),
	image: text("image").notNull(),
	price: integer("price", { mode: "number" }).notNull(),
	isAvailable: integer("is_available", { mode: "boolean" }).default(false),
	position: integer("position", { mode: "number" }).notNull(),
});

export const productCategory = sqliteTable("product_category", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	position: integer("position", { mode: "number" }).notNull(),
});

export const productByCategory = sqliteTable(
	"product_by_category",
	{
		product_id: integer("product_id", { mode: "number" })
			.notNull()
			.references(() => product.id),
		product_category_id: integer("product_category_id", { mode: "number" })
			.notNull()
			.references(() => productCategory.id),
	},
	(table) => ({
		pk: primaryKey(table.product_id, table.product_category_id),
	})
);
