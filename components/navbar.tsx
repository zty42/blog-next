"use client";

import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

import { Logo } from "./logo";
import { useScrollTop } from "@/hooks/use-scroll-top";
export const Navbar = () => {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "flex justify-between items-center bg-background sticky top-0 my-4",
        scrolled && "border-b"
      )}
    >
      <Logo />
      <div className="ml-auto justify-end flex items-center gap-2">
        <Link href="/archive" className="">
          归档
        </Link>
        <Link href="/tags" className="">
          标签
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
};
