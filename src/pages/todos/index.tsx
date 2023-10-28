import Elysia from "elysia";
import { ctx } from "../../context";
import { Item } from "../../components/Item";
import { protectedRoute } from "../../auth/protectedRoute";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/Input";

export const todoPage = new Elysia({ name: "@app/pages" }).use(ctx).get(
	"/todos",
	async ({ renderPage, db }) => {
		const todos = await db.query.todos.findMany();

		return renderPage(
			"Todos",
			<div class="grid place-content-center w-full h-full">
				<h1 class="text-center text-3xl">Todos</h1>
				<form class="flex gap-5" hx-target="#todos" hx-swap="beforeend">
					<div class="flex items-center ">
						<TextInput
							label="Enter your todo"
							placeholder=""
							type="text"
							name="title"
						/>
						<Button hx-post="/api/addTodo" type="submit" className="my-3 ml-3">
							Add Todo
						</Button>
					</div>
				</form>
				<ul
					class="flex flex-col items-start h-2xl gap-5 p-2 overflow-y-auto "
					hx-get="/api/getTodos"
					hx-trigger="get-todo from:body"
					id="todos"
				>
					{todos.map((todo) => (
						<Item id={todo.id} title={todo.title} />
					))}
				</ul>
			</div>
		);
	},
	protectedRoute
);
