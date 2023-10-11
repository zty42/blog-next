import { useMemo } from "react";
import { getPostContentByFilePath, getAllPosts } from "../../lib/api";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { getMDXComponent } from "mdx-bundler/client";
import { Post } from "../../@types";
import Head from "next/head";
import { DiscussionEmbed } from "disqus-react";

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
  const prev = allPosts[postIndex - 1] || null;
  const next = allPosts[postIndex + 1] || null;
  const post = await getPostContentByFilePath(postFilePath);
  return {
    props: {
      post,
      prev,
      next,
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
const Content: NextPage<ContentPageProps> = ({ post, prev, next }) => {
  const { code, frontmatter } = post;
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <Head>
        <title>blog - {frontmatter.title}</title>
      </Head>
      <div className="h-[64px] p-4"></div>
      <div className="flex flex-col flex-1 py-10 w-full max-w-4xl mx-auto animate__animated animate__fadeIn ">
        <h1 className="mb-0">{frontmatter?.title}</h1>
        <p className="text-sm">
          <span className="mr-4">{frontmatter?.date}</span>

          {frontmatter.tags &&
            frontmatter.tags.map((tag, index) => {
              return (
                <span
                  key={index}
                  className="ml-2 rounded p2
                text-[rgb(232,129,88)] dark:text-[rgb(211,114,80)]"
                >
                  #{tag}
                </span>
              );
            })}
        </p>
        <section className="flex-grow ">
          <Component></Component>
        </section>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <DiscussionEmbed
          shortname="typluto"
          config={{
            url: post.slug,
            identifier: post.slug,
            title: frontmatter.title,
            language: "zh_TW", //e.g. for Traditional Chinese (Taiwan)
          }}
        />

        <div className="flex justify-between">
          <div className="prev">
            {prev && (
              <Link href={`/post/${prev.slug}`} className="no-underline">
                <span className="flex items-center h-10 hover-link">
                  {prev.frontmatter?.title}
                </span>
              </Link>
            )}
          </div>
          <div className="next">
            {next && (
              <Link href={`/post/${next.slug}`} className="no-underline">
                <span className="flex items-center h-10 hover-link">
                  {next.frontmatter?.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
