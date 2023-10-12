import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { getAllPosts } from "../lib/api";
import { TITLE } from "../config";
export function getStaticProps() {
  const posts = getAllPosts();
  const tags = posts
    .map((post) => post.frontmatter.tags)
    .flat()
    .reduce((res, name) => {
      res[name] = res[name] ? ++res[name] : 1;
      return res;
    }, {});

  const tagList = Object.keys(tags)
    .sort((a, b) => tags[b] - tags[a])
    .map((tag) => {
      return [tag, tags[tag]];
    });

  return { props: { tagList } };
}
interface PageProps {
  tagList: string[][];
}
const Archive: NextPage<PageProps> = ({ tagList }) => {
  const headTitle = `所有标签 | ${TITLE}`;
  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <div className="py-10 w-full max-w-4xl mx-auto">
        <div className=" ">所有标签</div>
        {tagList.map((tag, index) => {
          return (
            <div
              className="animate__animated animate__fadeIn inline-block mr-4"
              key={index}
            >
              <Link href={`/tag/${tag[0]}`}>
                <div className="justify-center pt-1">
                  {tag[0]}
                  <span className=" ml-1">({tag[1]})</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Archive;
