import { getPostBySlug, getAllPosts } from "../../lib/api";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";

import React from "react";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface Post {
  slug: string;
  code: string;
  frontmatter?: { [key: string]: any };
}

interface ContentProps {
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
const Content: NextPage<ContentProps> = ({ post }) => {
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
