import type { Plugin } from "vite";
import { glob } from "glob";
import { readFileSync, writeFile } from "fs";
import { v4 as uuidv4 } from "uuid";
import splitMetadataFromMDContent from "parse-md";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

export type MetaData = {
  published: boolean;
  title: string;
  description: string;
  date: Date;
  imageUrl?: string;
};

export function buildPostsFromMarkdown(): Plugin {
  return {
    name: "posts_builder",
    buildStart() {
      process.stdout.write(`Building posts.json file...\n`);
      createPostsJson();
    },
    handleHotUpdate(ctx) {
      if (ctx.file.includes("src/posts/content")) {
        createPostsJson(true);
      }
    },
  };
}

const { parse: parseMDContent } = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight: (code, lang) => {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

function createPostsJson(update = false) {
  const markdownFiles = glob.sync("src/posts/content/*.md");

  // Parse markdown files
  const posts = markdownFiles
    .map((filePath) => {
      const fileName = filePath.split("/").pop()!;
      const fileContents = readFileSync(filePath, "utf-8");
      const { metadata, content } = splitMetadataFromMDContent(fileContents);
      if (!validateMetadata(metadata, fileName)) {
        logError(`Invalid metadata in ${fileName}, skipping.`);
      }

      if ((metadata as MetaData).published === false) {
        return null;
      }

      const html = parseMDContent(content) as TrustedHTML;

      return {
        id: uuidv4(),
        metadata: metadata as MetaData,
        html,
      };
    })
    .filter((post) => {
      if (!post) {
        return false;
      }
      return post.metadata.published;
    })
    .sort((a, b) => {
      return b!.metadata.date.getTime() - a!.metadata.date.getTime();
    });

  // Convert to JSON and write to file
  const postsJSON = JSON.stringify(posts, null, 2);
  writeFile("src/posts/posts.json", postsJSON, (error) => {
    if (error) {
      logError("Error writing posts.json file");
    }
    if (update) {
      console.log("\x1b[92mposts.json file updated successfully!\x1b[0m");
      return;
    }
    console.log("\x1b[92mposts.json file created successfully!\x1b[0m");
  });
}

function validateMetadata(metadata: unknown, fileName: string) {
  if (typeof metadata !== "object" || metadata === null) {
    return false;
  }

  const { published, title, description, date, imageUrl } =
    metadata as MetaData;

  if (!published || typeof published !== "boolean") {
    logWarning(
      ["Published is a required field and must be a boolean"],
      fileName,
    );
    return false;
  }

  if (!title || typeof title !== "string") {
    logWarning(["Title is a required field and must be a string"], fileName);
    return false;
  }

  if (!description || typeof description !== "string") {
    logWarning(
      ["Description is a required field and must be a string"],
      fileName,
    );
    return false;
  }

  if (!(date instanceof Date)) {
    logWarning(
      [
        "Date is a required field and a valid date or datetime",
        "Example: 2021-01-01",
        "Or: 2021-01-01T12:00:00",
      ],
      fileName,
    );
    return false;
  }

  if (imageUrl && typeof imageUrl !== "string") {
    logWarning(["imageUrl must be a string"], fileName);
    return false;
  }

  if (
    imageUrl &&
    !imageUrl.startsWith("http://") &&
    !imageUrl.startsWith("https://") &&
    !imageUrl.startsWith("/")
  ) {
    logWarning(
      [
        "imageUrl must be an absolute URL or a path starting with /",
        "Example: /images/my-image.jpg for image in public folder",
        "Or: https://example.com/image.jpg for an external image",
      ],
      fileName,
    );
    return false;
  }

  return true;
}

function logWarning(strings: string[], fileName: string) {
  const formatted = strings.map((str) => {
    return str + "\n";
  });
  console.warn(
    "\x1b[93m\n",
    "WARN: Markdown Parser: " + fileName + "\n",
    ...formatted,
    "\x1b[0m",
  );
}

function logError(string: string) {
  console.error("\x1b[91m", string, "\n\x1b[0m");
}
