import { getAllPosts } from "@/lib/api";
import Link from "next/link";

export default async function HomePage() {
  const posts = await getAllPosts();
  return (
    <main className="flex flex-col">
      <header className="my-8">
        <article>
          <p>个人博客，文字、代码、照片，记录工作和生活</p>
        </article>
      </header>

      <div>
        {posts.map((post) => {
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
      </div>
    </main>
  );
}
