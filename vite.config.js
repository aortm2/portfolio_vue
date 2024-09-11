import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
  @import "@/static/scss/abstracts/_variable.scss";
  @import "@/static/scss/abstracts/_mixin.scss";
  @import "@/static/scss/abstracts/_animation.scss";
`,
      },
    },
  },
});
