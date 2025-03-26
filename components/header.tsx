import Link from "next/link";

export const Header = () => {
  return (
    <header className="my-8 z-999">
      <article>
        <p>个人博客，文字、代码、照片，记录工作和生活</p>
      </article>
      <div className="flex gap-x-4 mt-4">
        <Link href="/archive" className="hover:underline">
          归档
        </Link>
        <Link href="/tags" className="hover:underline">
          标签
        </Link>
      </div>
    </header>
  );
};
