import Link from "next/link";
import Image from "next/image";
import LogoPng from "@/public/sunglasses.png";

export const Logo = () => {
  return (
    <div className="flex items-center gap-x-2 h-full font-bold text-3xl ">
      <Link href="/">
        <Image src={LogoPng} alt="logo" width={30} height={30} style={{display: "inline",marginRight: "10px"}} className="hover:animate-shake" />
        zty&apos;s blog
      </Link>
    </div>
  );
};
