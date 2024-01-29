import Link from "next/link";
import { Post } from "@/types/post";
import { getAllPosts } from "@/lib/api";
import { groupBy, sortBy } from "lodash-es";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "archive • zty's blog",
};

export default async function ArchivePage() {
  const posts: Post[] = await getAllPosts();
  const postsGroup = groupBy(posts, ({ frontmatter }: Post) => {
    const { date } = frontmatter;
    return date.split("-")[0];
  });

  const yearArray: string[] = sortBy(Object.keys(postsGroup), (year: string) =>
    Number(year)
  ).reverse();

  return (
    <>
      <main className="mt-10">
        {yearArray.map((year) => {
          return (
            <div className="pb-6" key={year}>
              <h2 className="tracking-wider text-3xl font-semibold">#{year}</h2>
              {postsGroup[year].map((post, index) => {
                return (
                  <Link
                    key={post.slug}
                    href={`/post/${post.slug}`}
                    className=" py-3 flex flex-col-reverse md:flex-row"
                  >
                    <time className="mr-4 opacity-50 md:opacity-100">
                      {post.frontmatter.date}
                    </time>
                    <h1>{post.frontmatter.title}</h1>
                  </Link>
                );
              })}
            </div>
          );
        })}
        {/*  */}
      </main>
    </>
  );
}
