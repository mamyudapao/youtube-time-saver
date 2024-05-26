import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { copy } from "vite-plugin-copy";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

// vite-plugin-copyをインストールしてください
// npm install vite-plugin-copy --save-dev

export default defineConfig({
  plugins: [
    react(),
    crx({
      manifest,
    }),
  ],
});
