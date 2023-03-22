import Link from "next/link";
import BackIcon from "./BackIcon";
interface HeaderInterface {
  title: string;
  isRootPath: boolean;
}

const Header = ({ title, isRootPath }: HeaderInterface) => {
  let header;
  if (isRootPath) {
    header = <div className="h-[64px]"></div>;
  } else {
    header = (
      <div className="h-[64px] p-4">
        <Link href="/" className="text-inherit no-underline flex h-full items-center">
          <BackIcon /> <span className="text-xl">{title}</span>
        </Link>
      </div>
    );
  }
  return header;
};

export default Header;
