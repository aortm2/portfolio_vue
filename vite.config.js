import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: 'https://aortm2.github.io',
  plugins: [vue()],
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
    assetsDir: "static",
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
        output: {
            assetFileNames: (assetInfo) => {
                // build 시 파일 타입 별 폴더 생성
                let extType = assetInfo.name.split(".").at(1);
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
    commonjsOptions: {
        // include: [/node_modules/], // 번들에 포함시킬 모듈의 경로
        // extensions: [".js", ".cjs"], // CommonJS 모듈로 간주할 파일의 확장자
        // strictRequires: true, // require 구문에 해당 모듈이 없을 경우 에러 발생
        // transformMixedEsModules: true, // import와 require문을 함께 사용하는 경우 이를 번들에 포함시키기 위함
    },
    // viteVuePluginOptions: {
    //     template: {
    //         compilerOptions: {
    //             isCustomElement: (tag) => tag.startsWith("q-"),
    //         },
    //     },
    // },
  },
});
