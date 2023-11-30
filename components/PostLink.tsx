import Link from "next/link";
import { Post } from "../@types";
import { formatDate } from "../lib/date";

export default function PostLink({ post }: { post: Post }) {
  const { frontmatter, slug } = post;
  return (
    <>
      <Link
        href={`/post/${slug}`}
        className="no-underline py-4 flex flex-col sm:flex-row"
      >
        <span className="mr-4">{formatDate(frontmatter.date)}</span>
        {frontmatter.title}
      </Link>
      {/* {frontmatter.tags &&
      frontmatter.tags.map((tag, index) => {
        return (
          <Link
          href={`/tag/${tag}`}
          className="no-underline"
          key={index}
          >
          <span className="ml-2 rounded p2">
          #{tag}
          </span>
          </Link>
          );
        })} */}
    </>
  );
}
