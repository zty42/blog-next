import { Header } from "@/components/header";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
              className="pb-1 flex flex-col-reverse md:flex-row md:items-center"
            >
              <time className="mr-4 opacity-50 md:opacity-100">
                {post.frontmatter.date}
              </time>
              <Link key={post.slug} href={`/post/${post.slug}`}>
                <Button variant="ghost" size="sm" asChild>
                  <h1>{post.frontmatter.title}</h1>
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
