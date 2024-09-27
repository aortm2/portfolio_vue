import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "/@views": fileURLToPath(new URL("./src/views", import.meta.url)),
      "/@static": fileURLToPath(new URL("./src/static", import.meta.url)),
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

  build: {
    minify: "terser",
    outDir: "dist",
    assetsDir: "assets",
    assetsInlineLimit: 20000,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
        output: {
            assetFileNames: (assetInfo) => {
                // build 시 파일 타입 별 폴더 생성
                let extType = assetInfo.name.split('.').pop();
                if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                    extType = "img";
                } else if (/woff/i.test(extType)) {
                    extType = "font";
                }
                return `static/${extType}/[name]-[hash][extname]`;
            },
            chunkFileNames: "static/js/[name]-[hash].js",
            entryFileNames: "static/js/[name]-[hash].js",
        },
    },
  },
});
