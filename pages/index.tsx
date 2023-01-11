import Link from "next/link";
import { getAllPosts } from "../lib/api";
import { useEffect } from "react";

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}
export default function Home({ posts }) {
  useEffect(() => {
    console.log("this is a effect");
  });
  return (
    <>
      <div>
        {posts.map((post) => {
          const { title, slug } = post;
          return (
            <p key={slug}>
              <Link href={`/a/${slug}`}>{title}</Link>
            </p>
          );
        })}
      </div>
    </>
  );
}
