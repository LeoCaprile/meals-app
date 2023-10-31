import { PropsWithChildren } from "@kitajs/html";

export function BasicLayout({
	title,
	children,
}: PropsWithChildren<{ title: string }>) {
	return (
		<main class="h-full sm:ml-64 p-10">
			<h1 class="text-4xl text-center mb-10 mt-20">{title}</h1>
			{children}
		</main>
	);
}
