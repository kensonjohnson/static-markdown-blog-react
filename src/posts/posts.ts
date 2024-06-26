import splitMetadataFromMDContent from "parse-md";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";

// This portion sets up the highlight.js library for syntax highlighting in code blocks.
// It's a bit of a mess because the types are not being recognized by Vite.
/// <reference path="../node_modules/highlight.js/types/index.d.ts" />
import hljs from "highlight.js/lib/core";

// Rather than pull in all languages, we'll just pull in the ones we need.
// This will make the bundle much smaller.
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);

// Finally, we choose what theme we want to use.
import "highlight.js/styles/github-dark.min.css";

const { parse: parseMDContent } = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight: (code, lang) => {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

export type Post = {
  metadata: MetaData;
  html: TrustedHTML;
  id: string;
};

type MetaData = {
  published: boolean;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
};

const postFiles = import.meta.glob<{ default: string }>("./content/*.md", {
  query: "?raw",
  eager: true,
});

const posts: Post[] = Object.entries(postFiles)
  .map(([path, rawMarkdown]) => {
    const { metadata, content } = splitMetadataFromMDContent(
      rawMarkdown.default,
    );
    const html = parseMDContent(content) as TrustedHTML;
    return {
      id: path.split("/").pop() as string,
      metadata: metadata as MetaData,
      html,
    };
  })
  .filter((post) => post.metadata.published)
  .sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );

console.log(posts[0].html);

export { posts };
