import { Context } from "elysia";
import { Session } from "lucia";

export const handleProtectedRoute = ({
	session,
	set,
}: {
	session: Session | null;
	set: Context["set"];
}) => {
	if (session === null) {
		set.status = 401;
		set.redirect = "/";
		return "Unauthorized";
	}
};

export const protectedRoute = { beforeHandle: [handleProtectedRoute] };
