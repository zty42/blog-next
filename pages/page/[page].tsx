import { GetStaticPaths, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Post } from "../../@types";
import { getPostsByPage, getPostsLength } from "../../lib/api";
import { formatDate } from "../../lib/date";
import { PAGE_SIZE, HEAD_DESCRIPTION, TITLE } from "../../config";
import PageButton from "../../components/PageButton";
import PostLink from "../../components/PostLink";

interface PageProps {
  posts: Post[];
  page: number;
  total: number;
}

export async function getStaticProps({ params }: { params: { page: string } }) {
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

const Page: NextPage<PageProps> = ({ posts, page, total }) => {
  const NextPageButton = () => {
    if (page * PAGE_SIZE >= total) {
      return null;
    }
    return (
      <Link href={`/page/${page + 1}`} className="no-underline">
        <PageButton>下一页</PageButton>
      </Link>
    );
  };
  const PrevPageButton = () => {
    if (page === 1) {
      return null;
    }
    return (
      <Link href={`/page/${page - 1}`} className="no-underline">
        <PageButton>上一页</PageButton>
      </Link>
    );
  };
  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <header className="mt-16">
        <article className=" text-xl">
          <p>{HEAD_DESCRIPTION}</p>
        </article>
      </header>
      <div className="py-10 animate__animated animate__fadeIn">
        {posts.map((post, index) => {
          return <PostLink post={post} key={index} />;
        })}
        <PrevPageButton />
        <NextPageButton />
      </div>
    </>
  );
};

export default Page;
