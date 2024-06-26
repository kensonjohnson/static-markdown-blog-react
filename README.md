# Fully Static Markdown Blog

This is a fully static blog generator that uses markdown files as the blog posts.
It is built with Vite, React, and Tailwind CSS.

## Features

- Fully static
- Markdown blog posts
- Syntax highlighting in code blocks
- Responsive design
- Dark mode

## Usage

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
---

# My First Post

This is my first post.
```

4. Start the development server

```bash
npm run dev
```

5. Open the browser and go to `http://localhost:5173`

## Build

To build the project, run the following command:

```bash
npm run build
```

The build artifacts will be in the `dist` directory.

## Deployment

To deploy the project, copy the contents of the `dist` directory to your web server.
All of the files are static, so you can host them on any web server.

## License

This project is open source and available under the [MIT License](LICENSE).
