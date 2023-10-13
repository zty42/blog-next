import { bundleMDX } from "mdx-bundler";
import { readFile } from "node:fs/promises";
import { Frontmatter } from "../@types";
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm'

export async function transMdx(path: string) {
  const fileContents = await readFile(path, "utf8");
  const { code, frontmatter } = await bundleMDX<Frontmatter>({
    source: fileContents,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []),remarkGfm];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypePrettyCode, { 
          theme: {
            dark: 'dracula-soft',
            light: 'dracula',
          },
         }]
    ];
      return options;
    },
    esbuildOptions(options) {
      options.minify = false;
      return options;
    },
  });

  return { code, frontmatter };
}

