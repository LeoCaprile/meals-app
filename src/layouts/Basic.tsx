import { PropsWithChildren } from "@kitajs/html";

export function BasicLayout({
	title,
	children,
}: PropsWithChildren<{ title: string }>) {
	return (
		<main class="h-full w-full p-10">
			<h1 class="text-4xl text-center mb-15">{title}</h1>
			{children}
		</main>
	);
}
