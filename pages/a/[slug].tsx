import { getPostBySlug, getAllPosts } from "../../lib/api";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { remark } from "remark";
import remarkMdx from "remark-mdx";
import html from "remark-html"
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
  // const compiled = await compile(post.content);
  // const content = compiled.toString();
  const content = remark()
  .use(remarkMdx)
  // .use(html)
  .processSync(post.content)
  .toString()

  console.log(content)

  return {
    props: {
      post: { ...post, content },
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
      <section>
        {post.content}
      </section>
    </div>
  );
};

export default Content;
