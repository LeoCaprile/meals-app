import Html from "@kitajs/html";
import { generate } from "short-uuid";
export function Button({
	children,
	className,
	...props
}: Html.PropsWithChildren<{ type: string; className?: string } & HTMLElement>) {
	const id = generate();

	return (
		<button
			{...props}
			hx-indicator={`#${id}`}
			class={
				"flex items-center justify-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 " +
				(className ?? "")
			}
		>
			{children}

			<div
				id={id}
				class="htmx-indicator text-xl i-material-symbols-circles-ext-outline animate-spin"
			></div>
		</button>
	);
}
