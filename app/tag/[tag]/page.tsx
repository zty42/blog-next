import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import type { Post } from "@/types/post";
import type { ResolvingMetadata, Metadata } from "next";
interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const posts: Post[] = await getAllPosts();
  return posts
    .map((post) => post.frontmatter.tags)
    .flat()
    .reduce((res: string[], name: string) => {
      res.includes(name) ? res : res.push(name);
      return res;
    }, [])
    .map((tag) => {
      return {
        tag,
      };
    });
}

export async function generateMetadata(
  { params }: TagPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { tag } = params;
  return {
    title: `${decodeURIComponent(tag)} • ${(await parent).title?.absolute} `,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const posts: Post[] = await getAllPosts();
  const filterPosts = posts.filter((post) =>
    post.frontmatter.tags.includes(decodeURIComponent(tag))
  );

  console.log(tag,decodeURIComponent(tag))

  return (
    <main className="mt-10">
      <h2 className="tracking-wider py-3 text-3xl font-semibold">#{decodeURIComponent(tag)}</h2>
      {filterPosts.map((post, index) => {
        return (
          <Link
            key={post.slug}
            href={`/post/${post.slug}`}
            className="no-underline py-3 flex flex-col-reverse md:flex-row"
          >
            <time className="mr-4 opacity-50 md:opacity-100">
              {post.frontmatter.date}
            </time>
            <h1>{post.frontmatter.title}</h1>
          </Link>
        );
      })}
    </main>
  );
}
