import Link from "next/link";
import Image from "next/image";
import LogoSvg from "@/public/logo.svg";

export const Logo = () => {
  return (
    <div className="flex items-center gap-x-2 h-full font-bold text-3xl z-50">
      <Link href="/">
        <Image src={LogoSvg} alt="logo" width={30} height={30} style={{display: "inline"}} />
        zty&apos;s blog
      </Link>
    </div>
  );
};
