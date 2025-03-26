import { Header } from "@/components/header";
import { getLatestPosts} from "@/lib/api";
import Link from "next/link";
import { 
  ChevronRight } from "lucide-react";

export default async function HomePage() {
  const posts = await getLatestPosts(10);
  return (
    <main className="flex flex-col">
      <Header />
      <div>
        {posts.map((post) => {
          return (
            <div
              key={post.slug}
              className="flex flex-col-reverse md:flex-row md:items-center mb-4"
            >
              <time className="mr-4 opacity-50">{post.frontmatter.date}</time>
              <Link key={post.slug} href={`/post/${post.slug}`}>
                <h1>{post.frontmatter.title}</h1>
              </Link>
            </div>
          );
        })}
      </div>
      <div>
        <Link href="/archive">
        <ChevronRight className="inline w-4 h-4 mr-1" />
        查看全部
        </Link>
      </div>
    </main>
  );
}
