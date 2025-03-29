import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig(({mode}) => {

  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react(), svgr()],
    base: env.VITE_BASE_PATH || "/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "~@": path.resolve(__dirname, "/src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~@/shared/styles/fonts.scss" as *;
          @use "~@/shared/styles/variables.scss" as *;
          `,
        },
      },
    },
  }
});
