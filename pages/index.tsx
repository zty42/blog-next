import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Post } from "../@types";
import { getPostsByPage } from "../lib/api";
import { formatDate } from "../lib/date";
import { PAGE_SIZE, HEAD_DESCRIPTION, TITLE } from "../config";
import PageButton from "../components/PageButton";
import PostLink from "../components/PostLink";
export function getStaticProps() {
  const posts = getPostsByPage();

  return { props: { posts } };
}

interface PageProps {
  posts: Post[];
}

const Home: NextPage<PageProps> = ({ posts }) => {
  const NextPageButton = () => {
    if (posts.length < PAGE_SIZE) {
      return null;
    }
    return (
      <Link href={`/page/2`} className="no-underline font-medium">
        <PageButton>下一页</PageButton>
      </Link>
    );
  };
  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <header className="mt-16">
        <article>
          <p>{HEAD_DESCRIPTION}</p>
        </article>
      </header>
      <div className="py-10 animate__animated animate__fadeIn">
        {posts.map((post, index) => {
          return (
            <PostLink post={post} key={index} />
          );
        })}
        <NextPageButton />
      </div>
    </>
  );
};

export default Home;
