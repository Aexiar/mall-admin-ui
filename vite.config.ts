import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import WindiCSS from "vite-plugin-windicss";
import Unocss from "unocss/vite";
import { presetIcons } from "unocss";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.VITE_APP_BUILD_DIRECTORY,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      WindiCSS(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: "Icon",
          }),
        ],
        dts: path.resolve(path.resolve(__dirname, "src"), "auto-imports.d.ts"),
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ["ep"],
          }),
        ],
        dts: path.resolve(path.resolve(__dirname, "src"), "components.d.ts"),
      }),
      Icons({
        autoInstall: true,
        compiler: "vue3", // 编译方式
        jsx: "react", // jsx 支持
      }),
      // 添加以下配置
      Unocss({
        presets: [
          presetIcons({
            scale: 1.2,
            warn: true,
          }),
        ],
        // 以下配置是为了可以直接使用标签 <i-ep-edit />
        variants: [
          {
            match: (s) => {
              if (s.startsWith("i-")) {
                return {
                  matcher: s,
                  selector: (s) => {
                    return s.startsWith(".") ? `${s.slice(1)},${s}` : s;
                  },
                };
              }
            },
          },
        ],
      }),
    ],
    build: {
      target: "es2015",
    },
    server: {
      // 解决 "vite use '--host' to expose"
      host: "0.0.0.0",
      port: 8080,
      open: true,
      proxy: {
        // 选项写法
        "/api": {
          target: "http://localhost:8088", // 所要代理的目标地址
          rewrite: (path) => path.replace(/^\/api/, ""),
          changeOrigin: true,
        },
      },
    },
  };
});
