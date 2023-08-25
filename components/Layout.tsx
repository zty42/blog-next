import React from "react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen px-4">
      <header className="w-full max-w-4xl mx-auto">
        <nav className="h-[60px] leading-[60px] flex justify-between items-center">
          <Link href="/" className="no-underline">
            <div className="logo text-2xl font-bold">tianyuan</div>
          </Link>
          <ul className="flex gap-3">
            <li>归档</li>
            <li>标签</li>
            <li>关于</li>
          </ul>
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
