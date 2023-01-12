import { join } from "path";
import { readdir, readFile, access } from "node:fs/promises";
import { existsSync } from "node:fs";

import { bundleMDX } from "mdx-bundler";
import { Frontmatter, Post } from "../@types";

const postsDirectory = join(process.cwd(), "_posts");

export async function getPostSlugs() {
  return await readdir(postsDirectory);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, realSlug);
  const lastPath = existsSync(fullPath)
    ? join(fullPath, "index.mdx")
    : `${fullPath}.mdx`;

  const fileContents = await readFile(lastPath, "utf8");
  const { code, frontmatter } = await bundleMDX<Frontmatter>({
    source: fileContents,
    esbuildOptions(options) {
      options.minify = false;
      return options;
    },
  });

  return { slug: realSlug, code, frontmatter };
}

export async function getAllPosts() {
  const slugs = await getPostSlugs();
  const postsPromises = slugs.map(async (slug) => await getPostBySlug(slug));
  // .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return await Promise.all(postsPromises);
}
