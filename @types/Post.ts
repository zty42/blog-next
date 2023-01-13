import Frontmatter from "./Frontmatter";

interface Post {
  slug: string;
  code: string;
  frontmatter: Frontmatter;
}

export default Post;
