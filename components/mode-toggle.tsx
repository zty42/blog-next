"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div>
      <Sun
        onClick={() => setTheme("dark")}
        className="h-[20px] w-[20px]  block dark:hidden"
      />
      <Moon
        onClick={() => setTheme("light")}
        className="h-[20px] w-[20px] hidden dark:block"
      />
    </div>
  );
}
