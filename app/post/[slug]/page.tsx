import type { Metadata, ResolvingMetadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import components from "@/components/mdx-components";
import { CalendarDays, Tag } from "lucide-react";
import { getMDXComponent } from "mdx-bundler/client";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  const { frontmatter } = post;
  return {
    title: `${frontmatter.title} • ${(await parent).title?.absolute} `,
    description: frontmatter?.description || "",
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);
  const { code, frontmatter } = post;
  const { tags, title, date } = frontmatter;
  const MdComponent = getMDXComponent(code);

  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight mt-6">{title}</h1>
      <div className="my-2">
        <time className="pr-2 inline-flex items-center gap-x-1">
          <CalendarDays className=" w-3 h-3 inline-block" /> {date}
        </time>
        {Array.isArray(tags) && (
          <>
            <Tag className="inline-block w-3 h-3 ml-4" />
            {tags.map((tag) => (
              <span key={tag} className="ml-2">
                #{tag}
              </span>
            ))}
          </>
        )}
      </div>
      <article className="my-10">
        <MdComponent components={components} />
      </article>
    </>
  );
}
