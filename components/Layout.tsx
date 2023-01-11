import { ReactNode } from "react";
import Header from "./Header";
type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }:LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>
        this is a footer
      </footer>
    </>
  );
};

export default Layout;
