import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as fs from "node:fs";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/",
  build: {
    chunkSizeWarningLimit: 3000,
  },
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem'))
  //   },
  //   host: 'localhost', // or use '0.0.0.0' for network access
  //   port: 5173 // or your preferred port
  // }
});
