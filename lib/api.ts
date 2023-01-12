import { join } from "path";
import fs from "fs";
import { bundleMDX } from "mdx-bundler";
import { Frontmatter, Post } from "../@types";
const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  const slugs = fs.readdirSync(postsDirectory);
  console.log(slugs);
  return slugs;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { code, frontmatter } = await bundleMDX<Frontmatter>({
    source: fileContents,
  });

  return { slug: realSlug, code, frontmatter };
}

export async function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const postsPromises = slugs.map(async (slug) => await getPostBySlug(slug));
  // .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  const res = await Promise.all(postsPromises);
  return res;
}
