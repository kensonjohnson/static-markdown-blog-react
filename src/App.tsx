import { Layout } from "./components/Layout";
import { PostList } from "./components/PostList";
import { posts } from "./posts/posts";
import { ViewPost } from "./components/Post";
import React, { useEffect, useRef, useState } from "react";

export function App() {
  const [selectedPost, setSelectedPost] = useState("home");
  const postList = useRef<Record<string, React.ReactNode>>({
    home: <PostList posts={posts} onSelect={onSelect} />,
    ...posts.reduce(
      (acc, post) => {
        acc[post.metadata.slug] = <ViewPost post={post} />;
        return acc;
      },
      {} as Record<string, React.ReactNode>,
    ),
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const slug = searchParams.get("slug");
    if (slug) {
      setSelectedPost(slug);
    }
  }, []);

  function onSelect(id: string) {
    setSelectedPost(id);
    window.history.pushState(null, "", `?slug=${id}`);
  }

  return (
    <Layout setSelectedPost={setSelectedPost}>
      {postList.current[selectedPost]}
    </Layout>
  );
}
