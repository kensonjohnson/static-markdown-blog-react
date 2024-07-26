import { type Post } from "../posts/posts";

export function ViewPost({ post }: { post: Post }) {
  const { metadata, html } = post;
  return (
    <div className="prose prose-lg m-auto flex w-full max-w-screen-lg flex-col p-4 dark:prose-invert lg:prose-2xl prose-pre:p-0 prose-ol:m-auto prose-ol:w-fit prose-ul:m-auto prose-ul:w-fit prose-table:m-auto">
      <h1>{metadata.title}</h1>
      <div>Posted: {getTimePast(metadata.date)}</div>
      <div
        className="prose-table:w-fit prose-table:text-center"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
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
