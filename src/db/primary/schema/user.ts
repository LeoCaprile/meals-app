import { relations } from "drizzle-orm";
import { sqliteTable, text, blob, integer } from "drizzle-orm/sqlite-core";
import { org } from "./org";

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	picture: text("picture").notNull(),
	email: text("email"),
	organizationId: integer("organization_id"),
	organizationRoleId: integer("organization_role_id").notNull(),
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
		.references(() => user.id, { onDelete: "cascade" }),
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
		.references(() => user.id, { onDelete: "cascade" }),
	hashedPassword: text("hashed_password"),
});
