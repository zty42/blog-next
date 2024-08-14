import Link from "next/link";
import { Code2 } from "lucide-react";
export const Logo = () => {
  return (
    <div className="flex items-center gap-x-2 h-full font-bold text-3xl z-50">
      <Link href="/" className="">
        zty&apos;s blog
      </Link>
    </div>
  );
};
