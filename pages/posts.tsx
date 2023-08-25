import { NextPage } from "next";
import Link from "next/link";
import { Post } from "../@types";
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
      <div className="py-10 w-full max-w-4xl mx-auto">
        {posts.map((post) => {
          const { frontmatter, slug } = post;
          return (
            <>
              <div
                key={slug}
                className="h-16 justify-center tracking-wider"
              >
                <Link href={`/post/${slug}`} className="no-underline font-medium">
                  <p className="text-xl font-bold">{frontmatter.title}</p>
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
