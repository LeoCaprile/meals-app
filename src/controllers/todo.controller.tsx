import Elysia from "elysia";
import { ctx } from "../context";
import { todos } from "../db/schema/todo";
import { eq } from "drizzle-orm";
import { Item } from "../components/Item";

export const todoController = new Elysia({
	name: "@app/controllers/todo",
})
	.use(ctx)
	.get("/getTodos", async (ctx) => {
		const todos = await ctx.db.query.todos.findMany();
		return (
			<>
				{todos.map((todo) => (
					<Item id={todo.id} title={todo.title} />
				))}
			</>
		);
	})
	.post("/addTodo", async (ctx) => {
		const { title } = ctx.body as { title: string };
		await ctx.db.insert(todos).values({ title }).execute();
		ctx.set.headers["HX-Trigger"] = "get-todo";
	})
	.post("/removeTodo/:id", async (ctx) => {
		const { id } = ctx.params;
		await ctx.db
			.delete(todos)
			.where(eq(todos.id, Number(id)))
			.execute();
	});
