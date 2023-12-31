// DISCLAIMER:
// THIS CODE WAS COPIED FROM https://github.com/ethanniser/beth-b2b-saas/blob/main/src/types/htmx.d.ts
// AND IS NOT MY OWN WORK (though I did modify it a bit)
// THANKS ETHAN

type RoutesByType<
	Schema extends Record<string, unknown>, // Ensure keys are strings
	Type extends "get" | "post" | "put" | "delete" | "patch"
> = RouterPattern<
	RemoveSlash<
		string &
			keyof {
				// Constrain to strings here
				[key in keyof Schema as Schema[key] extends { [key in Type]: unknown }
					? key
					: never]: true;
			}
	>
>;

type RemoveSlash<S extends string> = S extends `${infer T}/`
	? T extends ""
		? S
		: T
	: S;

type RouterPattern<T extends string> =
	T extends `${infer Start}:${infer Param}/${infer Rest}`
		? `${Start}${string}/${RouterPattern<Rest>}`
		: T extends `${infer Start}:${infer Param}`
		? `${Start}${string}`
		: T extends `${infer Start}*`
		? `${Start}${string}`
		: T;

type StartsWithApi<T extends string> = T extends `${"/api"}${infer Rest}`
	? T
	: never;

type DoesntStartWithApi<T extends string> = T extends `${"/api"}${infer Rest}`
	? never
	: T;

type Schema = import("./main").App["schema"];

type PostRoutes = RoutesByType<Schema, "post">;
type GetRoutes = RoutesByType<Schema, "get">;
type PutRoutes = RoutesByType<Schema, "put">;
type DeleteRoutes = RoutesByType<Schema, "delete">;
type PatchRoutes = RoutesByType<Schema, "patch">;

export type Pages = DoesntStartWithApi<GetRoutes>;

declare namespace JSX {
	interface HtmlAnchorTag extends HtmlAnchorTag {
		["href"]?: Pages;
	}
	interface HtmlTag extends Htmx.Attributes {
		["hx-get"]?: StartsWithApi<GetRoutes>;
		["hx-post"]?: StartsWithApi<PostRoutes>;
		["hx-put"]?: StartsWithApi<PutRoutes>;
		["hx-delete"]?: StartsWithApi<DeleteRoutes>;
		["hx-patch"]?: StartsWithApi<PatchRoutes>;
		_?: string;
	}
}
