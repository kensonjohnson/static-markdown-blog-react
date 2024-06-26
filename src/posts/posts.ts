import postsJson from "./posts.json" assert { type: "json" };

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

const posts: Post[] = postsJson;

export { posts };
