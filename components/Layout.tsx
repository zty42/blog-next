import React from "react";
import Header from "./Header";

const Layout = ({ children }: {children: React.ReactNode}) => {
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
          font-mono
          dark:prose-invert"
      >
        <Header />
        <main className="flex-grow flex flex-col w-full">{children}</main>
        <footer className="text-center flex-shrink-0 py-4">
          © {new Date().getFullYear()}, authored by zty.
        </footer>
      </div>
    </>
  );
};

export default Layout;
