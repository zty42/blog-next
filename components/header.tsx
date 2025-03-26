import Link from "next/link";

export const Header = () => {
  return (
    <header className="mb-8 ">
      <div className="flex mt-4 divide-x">
        <Link href="/archive" className="hover:underline pr-4 ">
          Archive
        </Link>
        <Link href="/tags" className="hover:underline px-4">
          Tags
        </Link>
        <Link href="/about" className="hover:underline px-4">
          About
        </Link>
      </div>
    </header>
  );
};
