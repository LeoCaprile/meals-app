import { relations } from "drizzle-orm";
import { sqliteTable, text, blob } from "drizzle-orm/sqlite-core";
import { org } from "./org";

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	picture: text("picture").notNull(),
	email: text("email"),
	organizationId: text("organization_id"),
});

export const userOrgRelation = relations(user, ({ one }) => ({
	organizationId: one(org, {
		fields: [user.organizationId],
		references: [org.id],
	}),
}));

export const session = sqliteTable("user_session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	activeExpires: blob("active_expires", {
		mode: "bigint",
	}).notNull(),
	idleExpires: blob("idle_expires", {
		mode: "bigint",
	}).notNull(),
});

export const key = sqliteTable("user_key", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	hashedPassword: text("hashed_password"),
});
