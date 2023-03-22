import { useMemo } from "react";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import LeftIcon from "../../components/LeftIcon";
import RightIcon from "../../components/RightIcon";
import { ParsedUrlQuery } from "querystring";
import { getMDXComponent } from "mdx-bundler/client";
import { Post } from "../../@types";
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
  const prev = allPosts[postIndex - 1] || null;
  const next = allPosts[postIndex + 1] || null;
  const post = await getPostBySlug(slug);
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
    <div className="flex flex-col flex-1 prose">
      <h1>{frontmatter?.title}</h1>
      <section className="flex-grow ">
        <Component></Component>
      </section>
      <div className="flex justify-between">
        <div className="prev">
          {prev && (
            <Link href={`/a/${prev.slug}`} className="text-inherit no-underline">
              <span className="flex items-center">
                <LeftIcon/>
                {prev.frontmatter?.title}</span>
            </Link>
          )}
        </div>
        <div className="next">
          {next && (
            <Link href={`/a/${next.slug}`} className="text-inherit no-underline">
              <span className="flex items-center">
                {next.frontmatter?.title}
                <RightIcon/>
                </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
