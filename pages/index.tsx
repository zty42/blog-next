import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Post } from "../@types";
import { getAllPosts, getPostsByPage } from "../lib/api";
import { formatDate } from "../lib/date";
import { PAGE_SIZE } from "../config";
import PageButton from "../components/PageButton";
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
        <title>blog</title>
      </Head>
      <header className="mt-16">
        <article className=" text-xl">
          <p>测试 Markdown 文件 2023</p>
        </article>
      </header>
      <div className="py-10 animate__animated animate__fadeIn prose prose-sm dark:prose-invert">
        {posts.map((post, index) => {
          const { frontmatter, slug } = post;
          return (
            <div key={index} className="justify-center py-4 text-sm">
              <Link href={`/post/${slug}`} className="no-underline">
                <p>{frontmatter.title}</p>
              </Link>
              <p className="text-sm">
                <span className="mr-2">
                  发布于 {formatDate(frontmatter.date)}
                </span>
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
              </p>
            </div>
          );
        })}
        <NextPageButton />
      </div>
    </>
  );
};

export default Home;
