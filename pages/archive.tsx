import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Post } from "../@types";
import { getAllPosts } from "../lib/api";
import { formatDate } from "../lib/date";
import { groupBy, sortBy } from "lodash-es";
export function getStaticProps() {
  const posts = getAllPosts();
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
  const yearArray: string[] = Object.keys(postsGroup).sort((a,b) => (Number(b) - Number(a)))
  return (
    <>
      <Head>
        <title>blog-归档</title>
      </Head>
      <div className="py-10 w-full max-w-4xl mx-auto">
        {yearArray.map((year) => {
          return (
            <div className="animate__animated animate__fadeIn" key={year}>
              <h1 className="tracking-wider text-xl pt-6">{year}</h1>
              {postsGroup[year].map((post, index) => {
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
                      <h3 className="font-bold mt-1">
                        <span className=" font-normal text-sm mr-6">{formatDate(frontmatter.date)}</span>
                        {frontmatter.title}
                      </h3>
                    </Link>
                  </div>
                );
              })}
            </div>
          );
        })}
        {/*  */}
      </div>
    </>
  );
};

export default Archive;
