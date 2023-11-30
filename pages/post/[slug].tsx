import { useMemo } from "react";
import { getPostContentByFilePath, getAllPosts } from "../../lib/api";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { getMDXComponent } from "mdx-bundler/client";
import { Post } from "../../@types";
import Head from "next/head";
import { TITLE } from "../../config";
// import Comment from "../../components/Comment";
// import Left from "../../components/icons/Left";
// import Right from "../../components/icons/Right";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface ContentPageProps {
  post: Post;
  prev: Post;
  next: Post;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams;
  const allPosts = getAllPosts();
  const postIndex = allPosts.findIndex((post) => post.slug === slug);
  const postFilePath = allPosts[postIndex].filePath;
  // const prev = allPosts[postIndex - 1] || null;
  // const next = allPosts[postIndex + 1] || null;
  const post = await getPostContentByFilePath(postFilePath);
  return {
    props: {
      post,
      // prev,
      // next,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  return {
    paths: posts.map((p) => ({
      params: {
        slug: `${p.slug}`,
      },
    })),
    fallback: false,
  };
};
const Content: NextPage<ContentPageProps> = ({ post }) => {
  const { code, frontmatter } = post;
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const { title } = frontmatter;
  const headTitle = `${title} | ${TITLE}`;

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <div className="flex flex-col flex-1 py-10 w-full max-w-4xl mx-auto animate__animated animate__fadeIn ">
        <h2>{frontmatter?.title}</h2>
        <p>
          <span className="mr-4">{frontmatter?.date}</span>

          {frontmatter.tags &&
            frontmatter.tags.map((tag, index) => {
              return (
                <Link href={`/tag/${tag}`} className="no-underline" key={index}>
                  <span key={index} className="ml-2 rounded p2">
                    #{tag}
                  </span>
                </Link>
              );
            })}
        </p>
        <hr />
        <section className="flex-grow ">
          <Component></Component>
        </section>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="my-8">
          <span>{">"}</span>
          <Link href="/" className="no-underline">
            <span className="ml-2 rounded p2">cd ..</span>
          </Link>
        </div>
        {/* <div className="flex justify-between my-4">
          <div className="prev">
            {prev && (
              <Link href={`/post/${prev.slug}`} className="no-underline">
                <span className="flex items-center h-10 hover-link">
                  <Left />
                  {prev.frontmatter?.title}
                </span>
              </Link>
            )}
          </div>
          <div className="next">
            {next && (
              <Link href={`/post/${next.slug}`} className="no-underline">
                <span className="flex items-center h-10 hover-link">
                  {next.frontmatter?.title} <Right />
                </span>
              </Link>
            )}
          </div>
        </div> */}
        {/* <Comment /> */}
      </div>
    </>
  );
};

export default Content;
