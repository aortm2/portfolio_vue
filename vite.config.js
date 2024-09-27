import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: 'https://aortm2.github.io',
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

  build: {
    outDir: 'dist', // 빌드 출력 디렉토리
    assetsDir: 'static', // 자산 파일이 저장될 디렉토리
    sourcemap: true, // 소스 맵 생성 여부
    rollupOptions: {
      input: '@/main.js', // 진입점 설정
      output: {
        entryFileNames: 'js/[name].js', // 진입점 파일 이름 패턴
        chunkFileNames: 'js/[name].js', // 청크 파일 이름 패턴
        assetFileNames: '[ext]/[name].[hash].[ext]', // 자산 파일 이름 패턴
      },
    },
  },
});
