# Fully Static Markdown Blog

This is a fully static blog generator that uses markdown files as the blog posts.
It is built with Vite, React, and Tailwind CSS.

It works by reading the markdown files in the `src/posts/content` directory and generating the blog posts.
This very simple implementation uses the niave approach of swapping out the content of the page using the `useState` hook.
There is no client-side router or server-side rendering.

The secret sauce is all in `parse-markdown.ts`, which is a custom Vite plugin:
The markdown files are parsed during build time, and again if a HMR update is triggered on the `src/posts/content` directory.
The parsed markdown is then stored in a JSON file in the `src/posts` directory, which is then imported into the React components via a helper in `src/posts/posts.ts`.

## Features

- Fully static
- Markdown blog posts
- Syntax highlighting in code blocks
- Responsive design
- Dark mode

## Tech Used

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [parse-md](https://www.npmjs.com/package/parse-md)
- [marked](https://www.npmjs.com/package/marked)
- [highlight.js](https://highlightjs.org/)

## Quick Start

1. Clone the repository

```bash
git clone https://github.com/kensonjohnson/static-markdown-blog-react.git
cd markdown-blog-react
```

2. Install dependencies

```bash
npm install
```

3. Create a markdown file in the `src/posts/content` directory

```plaintext
---
title: My First Post
date: 2021-08-01
description: This is my first post.
published: true
slug: my-first-post
imageUrl: /path/to/image.jpg
---

# My First Post

This is my first post.
```

4. Start the development server

```bash
npm run dev
```

5. Open the browser and go to `http://localhost:5173`

## Usage

To create a new blog post, create a new markdown file in the `src/posts/content` directory.
The markdown file should have the following header format:

```plaintext
---
title: My First Post
date: 2021-08-01
description: This is my first post.
published: true
slug: my-first-post
imageUrl: /path/to/image.jpg
---
```

- `title`: The title of the blog post
- `date`: The date of the blog post
- `description`: A short description of the blog post
- `published`: Whether the blog post is published or not
- `slug`: The slug of the blog post
- `imageUrl`: (Optional) The URL of the image to display with the blog post

After the header, you can write the content of the blog post in markdown format.

## Build

To build the project, run the following command:

```bash
npm run build
```

The build artifact will be the `dist` directory.

## Deployment

To deploy the project, copy the contents of the `dist` directory to your web server.
All of the files are static, so you can host them on any web server.

## License

This project is open source and available under the [MIT License](LICENSE).
