import Html from "@kitajs/html";
import { env } from "../config";

export const BaseHTML = ({
	children,
	title,
}: Html.PropsWithChildren<{ title: string }>) => (
	<>
		<html class="h-full" lang="es">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css"
				/>
				<link rel="stylesheet" href="/public/dist/unocss.css" />
				{env.NODE_ENV === "development" && (
					<script src="/public/liveReload.js"></script>
				)}
				<script src="/public/htmx@1.9.6.min.js" />
				<title safe>{title}</title>
			</head>
			<body class="flex-col h-full">{children}</body>
		</html>
	</>
);
