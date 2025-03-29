import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "zty's blog",
  description: "个人博客，文字、代码、照片，记录工作和生活",
  keywords: ["blog", "zty42"],
  openGraph: {
    images: ["https://img.zty95.com/oggraph.jpg"],
  },
  twitter: {
    images: ["hhttps://img.zty95.com/oggraph.jpg"],
  },
  metadataBase: new URL('https://zty95.com')
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background antialiased bg-dot")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <div className="flex flex-col  min-h-screen px-4 mx-auto antialiased max-w-3xl font-mono ">
            <Navbar />
            <Header />
            <main className="flex-grow flex flex-col w-full 0">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
