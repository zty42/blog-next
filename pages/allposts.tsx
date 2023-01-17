import { Button, Box, Chip } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { Post } from "../@types";
import { getAllPosts } from "../lib/api";
import { formatDate } from "../lib/date";
export function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}

interface AllpostsPageProps {
  posts: Post[];
}
const Allposts: NextPage<AllpostsPageProps> = ({ posts }) => {
  return (
    <>
      <div className=" my-20">
        {posts.map((post) => {
          const { frontmatter, slug } = post;
          return (
            <>
              <div key={slug} className="my-20">
                <Box
                  component={"h2"}
                  sx={{ color: "primary.main", mt: 0 }}
                  className="flex-1"
                >
                  <Link
                    href={`/a/${slug}`}
                    className="text-inherit no-underline"
                  >
                    {frontmatter.title}
                  </Link>
                </Box>
                <Box sx={{
                  display:'flex',
                  alignItems:'center'
                }}>
                  <Chip
                    label={formatDate(frontmatter.date)}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                  {frontmatter.tags.map((tag: string) => {
                    return (
                      <Button key={tag} size="small">
                        #{tag}
                      </Button>
                    );
                  })}
                </Box>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Allposts;
