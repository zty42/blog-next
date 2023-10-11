import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Post } from "../../@types";
import { getAllPosts } from "../../lib/api";
import { formatDate } from "../../lib/date";
import { groupBy, sortBy } from "lodash-es";
export const getStaticProps: GetStaticProps = ({ params }) => {
  const { tag } = params as { tag: string };
  const posts = getAllPosts();
  const tagGroup = posts.filter((post) => post.frontmatter.tags.includes(tag));
  return { props: { tagGroup, tagName: tag } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const tags = posts
    .map((post) => post.frontmatter.tags)
    .flat()
    .reduce((res, name) => {
      res.includes(name) ? res : res.push(name);
      return res;
    }, []);
  return {
    paths: tags.map((tag: string) => ({
      params: {
        tag: `${tag}`,
      },
    })),
    fallback: false,
  };
};

interface PageProps {
  tagGroup: Post[];
  tagName: string;
}

const TagPage: NextPage<PageProps> = ({ tagGroup,tagName }) => {
  const headTitle = `blog - 标签#${tagName}`;
  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <div className="py-10 w-full max-w-4xl mx-auto">
        <div className="animate__animated animate__fadeIn">
          <h2 className="tracking-wider pt-6">#{tagName}</h2>
          {tagGroup.map((post, index) => {
            const { frontmatter, slug } = post;
            return (
              <div
                key={index}
                className="justify-center pt-1 rounded-md border-b-1"
              >
                <Link
                  href={`/post/${slug}`}
                  className="no-underline font-medium"
                >
                  <p className="mt-1">
                    <span className=" font-normal text-sm mr-6">
                      {formatDate(frontmatter.date)}
                    </span>
                    {frontmatter.title}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TagPage;
