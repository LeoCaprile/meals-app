import { integer, text } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const scheduleType = sqliteTable("schedule_type", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
});

export const openingHours = sqliteTable("opening_hours", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	schedule_type_id: integer("schedule_type_id", { mode: "number" })
		.notNull()
		.references(() => scheduleType.id),
	day: integer("day", { mode: "number" }).notNull(),
	open: text("open").notNull(),
	close: text("close").notNull(),
});
