import Link from "next/link";
import { Post } from "../@types";
import { formatDate } from "../lib/date";

export default function PostLink({post}: {post: Post}) {
  const { frontmatter, slug } = post;
  return (
    <div className="py-4 flex">
    <span className="mr-4">{formatDate(frontmatter.date)}</span>
    <Link href={`/post/${slug}`} className="no-underline">
      <span className="font-bold">{frontmatter.title}</span>
    </Link>
    {frontmatter.tags &&
      frontmatter.tags.map((tag, index) => {
        return (
          <Link
            href={`/tag/${tag}`}
            className="no-underline"
            key={index}
          >
            <span
              className="ml-2 text-[rgb(232,129,88)] 
                dark:text-[rgb(211,114,80)]
                rounded p2"
            >
              #{tag}
            </span>
          </Link>
        );
      })}
  </div>
  )
}
