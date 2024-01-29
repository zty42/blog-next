import Link from "next/link";
import { Code2 } from "lucide-react";
export const Logo = () => {
  return (
    <div className="flex items-center gap-x-2 h-full">
      <Link href="/" className="">
        <Code2 className="dark:hidden inline-block" />
        <Code2 className="hidden text-[#f8fafc] dark:inline-block" />
        <span className="ml-2">zty&apos;s blog</span>
        
      </Link>
    </div>
  );
};
