import { getPostBySlug, getAllPosts } from "../../lib/api";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { getMDXComponent } from "mdx-bundler/client";
import React from "react";
import { Post } from "../../@types";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface ContentPageProps {
  post: Post;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const post = await getPostBySlug(slug);
  return {
    props: {
      post,
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
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <div>
      <h1>{frontmatter?.title}</h1>
      <section>
        <Component></Component>
      </section>
    </div>
  );
};

export default Content;
