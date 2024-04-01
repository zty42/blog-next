import Link from "next/link";
import { Tag } from "lucide-react";
import { getAllPosts } from "@/lib/api";
import { Button } from "@/components/ui/button";
import type { Post } from "@/types/post";
import type { Metadata } from "next";

type TagObject = {
  [key: string]: number;
};

export const metadata: Metadata = {
  title: "tags • zty's blog",
};

export default async function TagsPage() {
  const posts: Post[] = await getAllPosts();
  const tags = posts
    .map((post) => post.frontmatter.tags)
    .flat()
    .reduce((res: TagObject, name) => {
      res[name] = res[name] ? ++res[name] : 1;
      return res;
    }, {});

  const tagList = Object.keys(tags)
    .sort((a, b) => tags[b] - tags[a])
    .map((tag) => {
      return {
        tagName: tag,
        tagCount: tags[tag],
      };
    });

  return (
    <main className="mt-10">
      <h2 className="pt-6">所有标签</h2>
      {tagList.map((tag, index) => {
        return (
          <Link href={`/tag/${tag.tagName}`} key={index}>
            <Button key={index} variant="ghost">
              <Tag className="w-4 h-4 mr-1" />
              {tag.tagName}({tag.tagCount})
            </Button>
          </Link>
        );
      })}
    </main>
  );
}
