import { bundleMDX } from "mdx-bundler";
import { readFile } from "node:fs/promises";
import { Frontmatter } from "../@types";

export async function transMdx(path: string) {
  const fileContents = await readFile(path, "utf8");
  const { code, frontmatter } = await bundleMDX<Frontmatter>({
    source: fileContents,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
      options.rehypePlugins = [...(options.rehypePlugins ?? [])];
      return options;
    },
    esbuildOptions(options) {
      options.minify = false;
      return options;
    },
  });

  return { code, frontmatter };
}

