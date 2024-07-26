import { Layout } from "./components/Layout";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { PostList } from "./components/PostList";
import { type Post, posts } from "./posts/posts";
import { ViewPost } from "./components/Post";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <PostList /> },
      ...posts.map(buildRoute),
    ],
  },
];

export const router = createBrowserRouter(routes);

function buildRoute(post: Post): RouteObject {
  return {
    path: post.metadata.slug,
    element: <ViewPost post={post} />,
  };
}
