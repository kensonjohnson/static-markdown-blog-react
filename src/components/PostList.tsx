import { type Post, getTimePast } from "../posts/posts";
import Avatar from "boring-avatars";

export function PostList({
  posts,
  onSelect,
}: {
  posts: Post[];
  onSelect: (id: string) => void;
}) {
  return (
    <ul role="list" className="divide-y divide-gray-100 dark:divide-white/5">
      {posts.map((post) => {
        const { metadata, id } = post;
        const setSelectedPost = () => onSelect(metadata.slug);
        return (
          <li
            key={post.id}
            onClick={setSelectedPost}
            className="flex gap-x-4 py-5"
          >
            <div className="h-12 w-12 flex-none overflow-hidden rounded-sm bg-gray-50 dark:bg-zinc-800 sm:h-20 sm:w-20">
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
