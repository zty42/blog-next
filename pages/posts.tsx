import { NextPage } from "next";
import Link from "next/link";
import { Post } from "../@types";
import BackIcon from "../components/BackIcon";
import { getAllPosts } from "../lib/api";
import { formatDate } from "../lib/date";
export function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}

interface AllpostsPageProps {
  posts: Post[];
}
const Allposts: NextPage<AllpostsPageProps> = ({ posts }) => {
  return (
    <>
      <div className="h-[64px] p-4">
        <Link
          href="/"
          className="text-inherit no-underline flex h-full items-center"
        >
          <BackIcon /> <span className="text-xl">日志</span>
        </Link>
      </div>
      <div className="py-10 w-full max-w-4xl mx-auto">
        {posts.map((post) => {
          const { frontmatter, slug } = post;
          return (
            <>
              <div
                key={slug}
                className="h-16 px-4 justify-center tracking-wider"
              >
                <Link href={`/a/${slug}`} className="no-underline font-medium">
                  <p>{frontmatter.title}</p>
                  <span className="text-sm">
                    {formatDate(frontmatter.date)}
                  </span>
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Allposts;
