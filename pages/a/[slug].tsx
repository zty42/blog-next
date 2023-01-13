import { useMemo } from "react";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";

import { ParsedUrlQuery } from "querystring";
import { getMDXComponent } from "mdx-bundler/client";
import { Post } from "../../@types";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
  console.log(allPosts.map((item) => item.slug));
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
    <div>
      <h1>{frontmatter?.title}</h1>
      <section>
        <Component components={{ Button }}></Component>
      </section>
      <div className="flex justify-between">
        <div className="prev">
          {prev && (
            <Button href={`/a/${prev.slug}`} startIcon={<ArrowBackIcon />}>
              {prev.frontmatter?.title}
            </Button>
          )}
        </div>
        <div className="next">
          {next && (
            <Button href={`/a/${next.slug}`} endIcon={<ArrowForwardIcon />}>
              {next.frontmatter?.title}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
