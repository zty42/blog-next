import path from "path";
import fs from "fs/promises";
import { cache } from "react";
import { glob } from "glob";
import { transMdx } from "./mdx";

import type { Post } from "@/types/post";

export const getPosts = cache(async (): Promise<string[]> => {
  const posts = await glob("_posts/**");
  return posts;
});

export const getAllPosts = cache(async () => {
  const posts = await glob(`_posts/**/*.{md,mdx}`);
  return (await Promise.all(
    posts.map(async (post): Promise<Post> => {
      const slug = path.basename(post).replace(/\.mdx?$/, "");
      const fileContent = await fs.readFile(post, "utf8");
      const { code, frontmatter } = await transMdx(fileContent);
      return {
        slug,
        code,
        frontmatter,
      };
    })
  )).sort((a, b) => {
    return (
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
    )
  })
});

export const getIndexPosts = cache(async (): Promise<Post[]> => {
  const posts = await getAllPosts();
  return posts
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    })
    .slice(0, 5);
});

export const getPostBySlug = cache(async (slug: string): Promise<Post> => {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) as Post;
});
