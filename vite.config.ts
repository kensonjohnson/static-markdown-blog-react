import { defineConfig } from "vite";
import { buildPostsFromMarkdown } from "./parse-markdown";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), buildPostsFromMarkdown()],
  assetsInclude: ["**/*.md"],
});
