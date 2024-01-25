import Image from "next/image";

import { Button } from "./ui/button";
import Link from "next/link";

export const Logo = () => {
  return (
    <div className="flex items-center gap-x-2 h-full">
      <Link href="/" className="no-underline">
        <Image
          src="/logo.svg"
          height="20"
          width="20"
          alt="Logo"
          className="dark:hidden inline-block"
        />
        <Image
          src="/logo-dark.svg"
          height="20"
          width="20"
          alt="Logo"
          className="hidden dark:inline-block"
        />
        <span className="ml-2">
        zty&apos;s blog
        </span>
      </Link>
    </div>
  );
};
