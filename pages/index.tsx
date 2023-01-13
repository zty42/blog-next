import { NextPage } from "next";
import Link from "next/link";
import { Post } from "../@types";
import { getAllPosts } from "../lib/api";

export function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}

interface HomePageProps {
  posts: Post[];
}
const Home: NextPage<HomePageProps> = ({ posts }) => {
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
};

export default Home;
