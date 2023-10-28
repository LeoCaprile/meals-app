import Elysia, { t } from "elysia";
import { ctx } from "../context";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";
import to from "await-to-js";
import { UserControllerError } from "./errors";

export const userController = new Elysia().use(ctx).put(
	"/user/profile",
	async (ctx) => {
		if (!ctx.session) return;

		const { name, profilePicture } = ctx.body;

		if (!name) {
			throw new Error("Name is required");
		}

		if (name && profilePicture) {
			const actualProfilePicture = ctx.session.user.picture.replace(
				"https://utfs.io/f/",
				""
			);

			const [deleteErr] = await to(ctx.utapi.deleteFiles(actualProfilePicture));

			if (deleteErr) {
				throw new UserControllerError(
					"Error deleting previous profile picture"
				);
			}

			const [uploadErr, fileOnS3] = await to(
				ctx.utapi.uploadFiles(profilePicture)
			);

			if (uploadErr) {
				throw new UserControllerError("Error uploading new profile picture");
			}

			if (fileOnS3 && fileOnS3.data) {
				await ctx.db
					.update(user)
					.set({ name, picture: fileOnS3.data.url })
					.where(eq(user.id, ctx.session.user.id));
			} else {
				throw new UserControllerError(
					"There was an error uploading the file" + fileOnS3.error
				);
			}
		} else if (name) {
			await ctx.db
				.update(user)
				.set({ name })
				.where(eq(user.id, ctx.session.user.id));
		}

		ctx.set.headers["HX-Trigger"] = "get-session";
	},
	{
		body: t.Object({
			name: t.Optional(t.String()),
			profilePicture: t.Optional(t.File()),
		}),
	}
);
