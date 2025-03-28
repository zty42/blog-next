import { Header } from "@/components/header";
import { getLatestPosts} from "@/lib/api";
import Link from "next/link";

export default async function HomePage() {
  const posts = await getLatestPosts(8);
  return (
    <main className="flex flex-col">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Latest Posts</h2>
      <div>
        {posts.map((post) => {
          return (
            <div
              key={post.slug}
              className="flex flex-col-reverse md:flex-row md:items-center mb-4"
            >
              <time className="mr-4 opacity-50">{post.frontmatter.date}</time>
              <Link key={post.slug} href={`/post/${post.slug}`}>
                <h2>{post.frontmatter.title}</h2>
              </Link>
            </div>
          );
        })}
      </div>
      <div>
        <Link href="/archive" className="hover:underline">
        View all posts ⭢
        </Link>
      </div>
    </main>
  );
}
