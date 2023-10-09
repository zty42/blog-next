import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/logo.svg";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen px-4 mx-auto prose prose-sm">
      <header>
        <nav className="h-[60px] leading-[60px] flex justify-between items-center">
          <Link href="/" className="no-underline">
            <div className="logo text-2xl font-bold">
              <Image alt="logo" src={Logo} width={40} height={40} className="my-0 inline-block" />
              <span className="ml-2"></span>
            </div>
          </Link>
          <div className="flex gap-3">
            <Link href="/archive">
              <div className="hover:underline">归档</div>
            </Link>
            <Link href="/tags">
              <div className="hover:underline">标签</div>
            </Link>
            <Link href="/about">
              <div className="hover:underline">关于</div>
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow flex flex-col w-full">{children}</main>
      <footer className="text-center flex-shrink-0 py-4">
        © {new Date().getFullYear()}, authored by zty.
      </footer>
    </div>
  );
};

export default Layout;
