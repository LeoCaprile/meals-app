import { Button } from "./Button";

type ItemProps = {
	title: string | null;
	id: number;
};

export function Item({ id, title }: ItemProps) {
	return (
		<li class="flex gap-5 w-full justify-between" key={id}>
			{/* every thing that is get it from the user needs the safe attr to avoid xss*/}
			<span safe>{title}</span>

			<div
				class="i-material-symbols-delete-outline text-2xl cursor-pointer"
				hx-post={`/api/removeTodo/${id}`}
				hx-target="closest li"
				hx-swap="outerHTML"
			></div>
		</li>
	);
}
