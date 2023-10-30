import { defineConfig, presetUno } from "unocss";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
	cli: {
		entry: {
			patterns: ["src/{pages,layouts,components,controllers}/**/*.(tsx)"],
			outFile: "public/dist/unocss.css",
		},
	},
	presets: [presetUno(), presetIcons()],
});
