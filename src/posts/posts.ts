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
  slug: string;
};

export const posts: Post[] = postsJson;

export function getTimePast(date: string) {
  const dateNow = new Date();
  const datePosted = new Date(date);
  const diffTime = Math.abs(dateNow.getTime() - datePosted.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 365) {
    return `${Math.floor(diffDays / 365)}y ago`;
  }

  if (diffDays > 30) {
    return `${Math.floor(diffDays / 30)}mo ago`;
  }

  if (diffDays > 7) {
    return `${Math.floor(diffDays / 7)}w ago`;
  }

  return `${diffDays}d ago`;
}
