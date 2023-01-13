import { join } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { Frontmatter, Post } from "../@types";
import { transMdx } from "./mdx";
import matter from "gray-matter";
import glob from "glob";

const POST_DIR = "_posts";

/**
 *
 * @returns POST_DIR目录下的所有mdx,md文件
 */
export function getPostPath(): string[] {
  return glob.sync(POST_DIR + "/**/*.{mdx,md}");
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
/**
 * 详情页数据
 * @param slug
 * @returns
 */
export async function getPostBySlug(slug: string) {
  const { code, frontmatter } = await transMdx(
    getRealPath(join(POST_DIR, slug))
  );
  return { slug, code, frontmatter };
}
/**
 * 用于首页数据展示,不需要处理mdx文件的内容
 * @param path
 * @returns
 */
export function getPostByPath(path: string): Post {
  const { data } = matter(readFileSync(path));

  return {
    slug: getSlug(path),
    code: "",
    frontmatter: data as Frontmatter,
  };
}

export async function getAllPosts() {
  const postsPromises = getPostPath().map(
    async (path) => await getPostByPath(path)
  );

  return await Promise.all(postsPromises);
}
