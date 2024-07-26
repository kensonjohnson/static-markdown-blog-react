import { defineConfig } from "vite";
import { buildPostsFromMarkdown } from "./parse-markdown";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? "/static-markdown-blog-react/"
      : "/",
  plugins: [react(), buildPostsFromMarkdown()],
});
