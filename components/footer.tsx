import Link from "next/link";
import { Github } from "lucide-react";
export const Footer = () => {
  return (
    <footer className="text-center flex-shrink-0 py-4">
      ©{new Date().getFullYear()}, authored by{" "}
      <Link href="https://github.com/zty42">
        <Github className="inline w-4 h-4" />
        zty
      </Link>
    </footer>
  );
};
