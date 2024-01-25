import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="text-center flex-shrink-0 py-4">
      ©{new Date().getFullYear()}, authored by <Link href="https://github.com/zty42">zty</Link>.
    </footer>
  );
};
