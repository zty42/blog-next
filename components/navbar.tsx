"use client";

import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

import { Logo } from "./logo";
import { useScrollTop } from "@/hooks/use-scroll-top";
export const Navbar = () => {
  return (
    <div
      className={cn(
        "flex justify-between items-center my-4 z-50"
      )}
    >
      <Logo />
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
};
