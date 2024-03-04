import { Header } from "@/components/header";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";

export default async function HomePage() {
  const posts = await getAllPosts();
  return (
    <main className="flex flex-col">
      <Header />
      <div>
        {posts.map((post) => {
          return (
            <div
              key={post.slug}
              className="py-3 flex flex-col-reverse md:flex-row hover:bg-[#fcf5f5]"
            >
              <time className="mr-4 opacity-50 md:opacity-100">
                {post.frontmatter.date}
              </time>
              <Link
                key={post.slug}
                href={`/post/${post.slug}`}
                // className="py-3 flex flex-col-reverse md:flex-row"
              >
                <h1>{post.frontmatter.title}</h1>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
