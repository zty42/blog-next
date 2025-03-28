import { bundleMDX } from "mdx-bundler";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import type { Frontmatter } from "@/types/frontmatter";

export async function transMdx(source: string) {
  const { code, frontmatter } = await bundleMDX<Frontmatter>({
    source,
    mdxOptions(options, frontmatter) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [
          rehypePrettyCode,
          {
            theme:{
              dark: "vitesse-dark",
              light: "vitesse-light",
            }
          },
        ],
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

