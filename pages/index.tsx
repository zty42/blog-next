import Link from "next/link";
import { Post } from "../@types";
import { getAllPosts } from "../lib/api";

export async function getStaticProps() {
  const posts = await getAllPosts();
  return { props: { posts } };
}
export default function Home({ posts }: { posts: Post[] }) {
  return (
    <>
      <div>
        {posts.map((post) => {
          const { frontmatter, slug } = post;
          return (
            <p key={slug}>
              <Link href={`/a/${slug}`}>{frontmatter?.title}</Link>
            </p>
          );
        })}
      </div>
    </>
  );
}
