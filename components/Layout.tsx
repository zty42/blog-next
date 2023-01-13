import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { teal } from "@mui/material/colors";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: teal[300],
      },
    },
  });
  const rootPath = `/`;
  const router = useRouter();
  const isRootPath = router.pathname === rootPath;

  return (
    <ThemeProvider theme={theme}>
      <div className="max-w-[48rem] mx-auto" data-is-root-path={isRootPath}>
        <Header title={"Test Title"} isRootPath={isRootPath} />
        <main>{children}</main>
        <footer className=" text-center">
          © {new Date().getFullYear()}, authored by zty.
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
