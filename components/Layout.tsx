import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col w-full">{children}</main>
      <footer className="text-center flex-shrink-0 py-4">
        © {new Date().getFullYear()}, authored by zty.
      </footer>
    </div>
  );
};

export default Layout;
