// import { remark } from "remark";
// import html from "remark-html";
import { useRouter } from "next/router";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface Post {
  content: string;
  title: string;
  slug: string;
}

interface ContentProps {
  post: Post;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const post = getPostBySlug(slug);

  return {
    props: {
      post,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
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
  return (
    <div>
      <h1>{post.title}</h1>
      <pre>{post.content}</pre>
    </div>
  );
};

export default Content;
