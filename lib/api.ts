import { join } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { Frontmatter, Post } from "../@types";
import { transMdx } from "./mdx";
import matter from "gray-matter";
import glob from "glob";
import { PAGE_SIZE } from "../config";

const POST_DIR = "_posts";

export function getPostPath(): string[] {
  return glob.sync(POST_DIR + "/**/*.{mdx,md}");
}

export function getPostsLength(): number {
  return getPostPath().length;
}
export function formatSlug(slug: string): string {
  return slug.replace(/\.(mdx|md)/, "");
}
export function getSlug(path: string): string {
  return formatSlug(path.split("/").at(1) || "");
}
export function getRealPath(filePath: string): string {
  let realPath;

  if (existsSync(filePath)) {
    realPath =
      glob.sync(filePath.replaceAll(`\\`, "/") + "/*.{mdx,md}")[0] || "";
  } else {
    const mdxPath = `${filePath}.mdx`;
    const mdPath = `${filePath}.md`;
    realPath = existsSync(mdxPath) ? mdxPath : mdPath;
  }

  return realPath;
}
export async function getPostContentBySlug(slug: string) {
  const { code, frontmatter } = await transMdx(
    getRealPath(join(POST_DIR, slug))
  );
  return { slug, code, frontmatter };
}

export function getPostMatterByPath(path: string) {
  const { data } = matter(readFileSync(path));
  return { frontmatter: data, slug: getSlug(path) };
}

export function getAllPosts() {
  return getPostPath()
    .map((path) => getPostMatterByPath(path))
    .sort((a, b) => dateSortDesc(a?.date, b?.date));
}

export function getPostsByPage(page: number = 1, pageSize: number = PAGE_SIZE) {
  const allPosts = getAllPosts();
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return allPosts.slice(start, end);
}

export function dateSortDesc(a, b) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}
