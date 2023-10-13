import { readFileSync } from "node:fs";
import { transMdx } from "./mdx";
import matter from "gray-matter";
import glob from "glob";
import { PAGE_SIZE, POST_DIR } from "../config";
import {formatDate} from './date'

export function getPostPath(): string[] {
  const result = glob.sync(POST_DIR + "/**/*.{mdx,md}");
  return result;
}

export function getPostsLength(): number {
  return getPostPath().length;
}

export function getSlug(path: string): string {
  const res = (path.split(`${POST_DIR}/`).at(1) as string)
    .replace(/\.(mdx|md)/, "")
    .replace("/", "_");
  return res;
}

export async function getPostContentByFilePath(filePath: string) {
  const { code, frontmatter } = await transMdx(filePath);
  return { code, frontmatter };
}

export function getPostMatterByPath(path: string) {
  const { data } = matter(readFileSync(path));
  const yearInfo = formatDate(data.date,'yyyy')
  return { frontmatter: data, slug: getSlug(path), filePath: path,yearInfo };
}

export function getAllPosts() {
  return getPostPath()
    .map((path) => getPostMatterByPath(path))
    .filter((post) => !post.frontmatter?.draft)
    .sort((a, b) => dateSortDesc(a.frontmatter?.date, b.frontmatter?.date))
    
}

export function getPostsByPage(page: number = 1, pageSize: number = PAGE_SIZE) {
  const allPosts = getAllPosts();
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return allPosts.slice(start, end);
}

export function dateSortDesc(a: number | string, b: number | string) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}
