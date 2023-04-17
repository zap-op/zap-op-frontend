import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";
import postcssUrl from "postcss-url";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "build",
	},
	server: {
		host: true,
    port: 3000,
	},
	css: {
		postcss: {
			plugins: [
				autoprefixer,
				postcssUrl({
					url: "inline",
				}),
			],
		},
	},
});
