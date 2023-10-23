import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
interface LayoutProps {
  children: React.ReactNode;
}
// import DarkModeButton from "./DarkModeButton";
const DarkModeButton = dynamic(() => import("./DarkModeButton"), {
  ssr: false,
});

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div
        className="flex flex-col 
          min-h-screen px-4 mx-auto
          antialiased 
          prose
          prose-p:mb-2
          prose-hr:my-1
          prose-blockquote:before:content-none
          dark:prose-invert"
      >
        <header>
          <nav className="h-[60px] leading-[60px] flex justify-between items-center">
            <Link href="/" className="no-underline">
              <div className="logo text-2xl font-bold">
                <Image
                  alt="logo"
                  src="/logo.svg"
                  width={40}
                  height={40}
                  className="my-0 inline-block hover:rotate-12 transition-all duration-300"
                />
                <span className="ml-2"></span>
              </div>
            </Link>
            <div className="flex gap-3">
              <Link href="/archive" className="no-underline">
                <div className="hover-link">归档</div>
              </Link>
              <Link href="/tags" className="no-underline">
                <div className="hover-link">标签</div>
              </Link>
              <Link href="/about" className="no-underline">
                <div className="hover-link">关于</div>
              </Link>
              <div className="w-6 flex items-center">
                <DarkModeButton />
              </div>
            </div>
          </nav>
        </header>
        <main className="flex-grow flex flex-col w-full">{children}</main>
        <footer className="text-center flex-shrink-0 py-4">
          © {new Date().getFullYear()}, authored by zty.
        </footer>
      </div>
    </>
  );
};

export default Layout;
