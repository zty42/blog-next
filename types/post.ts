import { Frontmatter } from "./frontmatter";

export type Post = {
  slug: string;
  code: string;
  frontmatter: Frontmatter;
};
