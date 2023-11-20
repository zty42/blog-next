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
            <div className="hover-link">首页</div>
          </Link>
          <Link href="/archive" className="no-underline">
            <div className="hover-link">归档</div>
          </Link>
          <Link href="/tags" className="no-underline">
            <div className="hover-link">标签</div>
          </Link>
          {/* <Link href="/about" className="no-underline">
            <div className="hover-link">关于</div>
          </Link> */}
        </div>
        <div className=" flex items-center ml-3 h-full">
          <DarkModeButton />
        </div>
      </nav>
    </header>
  );
}
