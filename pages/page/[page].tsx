import { GetStaticPaths, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Post } from "../../@types";
import { getPostsByPage, getPostsLength } from "../../lib/api";
import { formatDate } from "../../lib/date";
import { PAGE_SIZE } from "../../config";
import PageButton from "../../components/PageButton";

interface PageProps {
  posts: Post[];
  page: number;
  total: number;
}

export async function getStaticProps({ params }) {
  const { page } = params;
  const posts = getPostsByPage(Number(page));
  const total = await getPostsLength();
  return { props: { posts, page: Number(page), total } };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const total = await getPostsLength();
  return {
    paths: Array.from({ length: Math.ceil(total / PAGE_SIZE) }, (_, i) => ({
      params: { page: `${i + 1}` },
    })),
    fallback: false,
  };
};

const Home: NextPage<PageProps> = ({ posts, page, total }) => {
  const NextPageButton = () => {
    if (page * PAGE_SIZE >= total) {
      return null;
    }
    return (
      <Link href={`/page/${page + 1}`} className="no-underline font-medium">
        <PageButton>下一页</PageButton>
      </Link>
    );
  };
  const PrevPageButton = () => {
    if (page === 1) {
      return null;
    }
    return (
      <Link href={`/page/${page - 1}`} className="no-underline font-medium">
        <PageButton>上一页</PageButton>
      </Link>
    );
  };
  return (
    <>
      <Head>
        <title>blog</title>
      </Head>
      <header className="prose mt-16 w-full max-w-4xl mx-auto">
        <article>
          <h1>Hi there 👋</h1>
          <p>web dev</p>
        </article>
      </header>
      <div className="py-10 w-full max-w-4xl mx-auto">
        {posts.map((post, index) => {
          const { frontmatter, slug } = post;
          return (
            <div
              key={index}
              className="justify-center mb-6 p-6 bg-white rounded-md"
            >
              <Link href={`/post/${slug}`} className="no-underline font-medium">
                <h1 className="text-xl font-bold tracking-wider">
                  {frontmatter.title}
                </h1>
                <p className="text-[rgb(108,108,108)] my-2">
                  {frontmatter.summary}
                </p>
                <p className="text-[rgb(108,108,108)]">
                  {formatDate(frontmatter.date)}
                </p>
              </Link>
            </div>
          );
        })}
        <div className="flex gap-3">
          <PrevPageButton />
          <NextPageButton />
        </div>
      </div>
    </>
  );
};

export default Home;
