(function () {
	const ws = new WebSocket("ws://localhost:3020/ws");

	ws.addEventListener("message", function (event) {
		window.location.reload();
	});
})();
