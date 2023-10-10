import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Post } from "../@types";
import { getAllPosts } from "../lib/api";
import { sortBy,groupBy } from "lodash-es";
export function getStaticProps() {
  const posts = getAllPosts();
  const tags = posts
    .map((post) => post.frontmatter.tags)
    .flat()
    .reduce((res, name) => {
      res[name] = res[name] ? ++res[name] : 1;
      return res;
    }, {});
  console.log(
    Object.keys(tags).sort((a, b) => tags[b] - tags[a]).map((tag) => {
      return [tag, tags[tag]];
    }))



  const postsGroup = groupBy(posts, "yearInfo");
  return { props: { postsGroup } };
}
type PostGroup = {
  [key: string]: Post[];
};
interface PageProps {
  postsGroup: PostGroup;
}

const Archive: NextPage<PageProps> = ({ postsGroup }) => {
  return (
    <>
      <Head>
        <title>blog-所有标签</title>
      </Head>
      <div className="py-10 w-full max-w-4xl mx-auto"></div>
    </>
  );
};

export default Archive;
