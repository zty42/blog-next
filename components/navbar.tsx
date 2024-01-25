"use client";

import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
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
      <div className="ml-auto justify-end flex items-center">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/archive" className="no-underline">
            归档
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/tags" className="no-underline">
            标签
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};
