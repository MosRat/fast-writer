import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {internalIpV4} from "internal-ip";
import {resolve} from 'path'

const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    define: {
        __VUE_PROD_DEVTOOLS__: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, "./src"),
            '@cp': resolve(__dirname, "./src/components"),
            '@view': resolve(__dirname, "./src/views"),
            '@lib': resolve(__dirname, "./src/libs"),
        }
    },
    plugins: [vue()],

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
        host: mobile ? "0.0.0.0" : false,
        hmr: mobile
            ? {
                protocol: "ws",
                host: await internalIpV4(),
                port: 1421,
            }
            : undefined,
        watch: {
            // 3. tell vite to ignore watching `src-tauri`
            ignored: ["**/src-tauri/**"],
        },
    },
}));
