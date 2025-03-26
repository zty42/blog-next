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
  const tags = posts
    .map((post) => post.frontmatter.tags)
    .flat()
    .reduce((res: string[], name) => {
      if (!res.includes(name)) {
        res.push(name);
      }
      return res;
    }, []);
  console.log(tags);

  const params = tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
  console.log("Generated params:", params); // 打印最终返回的参数对象数组

  // 临时检查特定标签是否存在
  const hasZhuiJu = params.some((p) => p.tag === "追剧");
  console.log('Does params include "追剧"?', hasZhuiJu);

  return params;
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

  return (
    <main className="mt-10">
      <h2 className="tracking-wider py-3 text-3xl font-semibold">
        #{decodeURIComponent(tag)}
      </h2>
      {filterPosts.map((post, index) => {
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
    </main>
  );
}
