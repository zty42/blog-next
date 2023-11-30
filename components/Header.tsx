import dynamic from "next/dynamic";
import Link from "next/link";

const DarkModeButton = dynamic(() => import("./DarkModeButton"), {
  ssr: false,
});

export default function Header() {
  return (
    <header>
      <nav className="h-[60px] leading-[60px] flex justify-between items-center font-bold">
        <div className="flex gap-3">
          <Link href="/" className="no-underline">
            首页
          </Link>
          <Link href="/archive" className="no-underline">
            归档
          </Link>
          <Link href="/tags" className="no-underline">
            标签
          </Link>
          <Link href="/memos" className="no-underline">
            MEMO
          </Link>
          {/* <Link href="/about" className="no-underline">关于</Link> */}
        </div>
        <div className=" flex items-center ml-3 h-full">
          <DarkModeButton />
        </div>
      </nav>
    </header>
  );
}
