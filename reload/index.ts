import Elysia from "elysia";
import chokidar from "chokidar";

const watcher = chokidar.watch("./src");

export const ws = new Elysia()
	.ws("/ws", {
		open: (ws) => {
			watcher.on("all", () => {
				setTimeout(() => {
					ws.send("reload");
				}, 500);
			});
		},
	})
	.listen(3020)
	.onStop(() => {
		watcher.close();
	});

console.log("Watcher listen on 3020");
