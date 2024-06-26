import type { Post } from "../posts/posts";
import Avatar from "boring-avatars";

type PostListProps = {
  posts: Post[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <ul role="list" className="divide-y divide-gray-100 dark:divide-white/5">
      {posts.map((post) => {
        const { metadata, id } = post;
        return (
          <li key={post.id} className="flex gap-x-4 py-5">
            <div className="h-12 w-12 flex-none overflow-hidden rounded-sm bg-gray-50 sm:h-20 sm:w-20">
              {metadata.imageUrl ? (
                <img
                  className="object-contain"
                  src={metadata.imageUrl}
                  alt=""
                />
              ) : (
                <Avatar
                  size={80}
                  name={id}
                  square={true}
                  variant="marble"
                  colors={["#003049", "#d62828", "#0f4c5c"]}
                />
              )}
            </div>
            <div className="flex-auto">
              <div className="flex items-baseline justify-between gap-x-4">
                <p className="text-sm font-semibold leading-6">
                  {metadata.title}
                </p>
                <p className="flex-none text-xs">
                  <time dateTime={metadata.date}>
                    {getTimePast(metadata.date)}
                  </time>
                </p>
              </div>
              <p className="mt-1 line-clamp-2 text-sm leading-6">
                {metadata.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function getTimePast(date: string) {
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
