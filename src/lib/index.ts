import type { Pages } from "../htmx";

export function redirect(
	{
		set,
		headers,
	}: {
		headers: Record<string, string | null>;
		set: {
			headers: Record<string, string> & {
				"Set-Cookie"?: string | string[];
			};
			status?: number | string;
			redirect?: string;
		};
	},
	href: Pages
) {
	if (headers["hx-request"] === "true") {
		set.headers["HX-Location"] = href;
	} else {
		set.redirect = href;
	}
}
