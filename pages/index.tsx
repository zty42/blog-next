import { Button, Box, Divider } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { NextPage } from "next";
import Link from "next/link";
import { Post } from "../@types";
import { getAllPosts } from "../lib/api";
import { formatDate } from "../lib/date";
export function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}

interface HomePageProps {
  posts: Post[];
}
const Home: NextPage<HomePageProps> = ({ posts }) => {
  return (
    <>
      <div className=" my-20">
        {posts.map((post) => {
          const { frontmatter, slug } = post;
          return (
            <>
              <div key={slug} className="flex my-10">
                <div className="flex-none w-[180px]">
                  <div className="text-base text-gray-400 font-normal flex items-center">
                    <CalendarMonthOutlinedIcon />
                    <span className="ml-1">{formatDate(frontmatter.date)}</span>
                  </div>
                </div>
                <div>
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
                  <Box>
                    {frontmatter.tags.map((tag: string) => {
                      return (
                        <Button key={tag} size="small">
                          #{tag}
                        </Button>
                      );
                    })}
                  </Box>
                  <Box>{frontmatter.summary}</Box>
                </div>
              </div>
              <Divider></Divider>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;
