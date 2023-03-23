import { NextPage } from "next";
import Link from "next/link";

const Home = () => {
  const list = [
    {
      name: "日志",
      url: "/posts/",
    },
    {
      name: "GitHub",
      url: "/qweqweqwe",
    },
  ];
  return (
    <div className="prose mt-16 w-full max-w-4xl mx-auto">
      <article className="p-4">
        <h1>title</h1>
        <p>web dev</p>
      </article>
      <div className="p-4">
        {list.map((item, index) => {
          return (
            <Link href={item.url} key={index} className="block h-20 no-underline">
              <div>{item.name}</div>
              <div>{item.url}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
