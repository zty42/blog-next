"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    console.log("Current theme:", theme);
  }, [theme]);

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
