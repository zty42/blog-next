import { join } from "path";
import { readdir, readFile,stat } from "node:fs/promises";
import { bundleMDX } from "mdx-bundler";
import { Frontmatter, Post } from "../@types";
const postsDirectory = join(process.cwd(), "_posts");

export async function getPostSlugs() {
  return await readdir(postsDirectory);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, slug);
  const statRes = await stat(fullPath)
  const lastPath = statRes.isFile() ? fullPath : join(fullPath,'index.mdx')
  const fileContents = await readFile(lastPath, "utf8");
  const { code, frontmatter } = await bundleMDX<Frontmatter>({
    source: fileContents,
  });

  return { slug:realSlug, code, frontmatter };
}

export async function getAllPosts(fields: string[] = []) {
  const slugs = await getPostSlugs();
  const postsPromises = slugs
    .map(async (slug) => await getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  const res = await Promise.all(postsPromises);
  return res;
}
