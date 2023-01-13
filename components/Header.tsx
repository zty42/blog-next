import { Box } from "@mui/material";
import Link from "next/link";

interface HeaderInterface {
  title: string;
  isRootPath: boolean;
}

const Header = ({ title, isRootPath }: HeaderInterface) => {
  let header;
  if (isRootPath) {
    header = (
      <Box component={"h1"} sx={{ color: "primary.main" }}>
        <Link href="/" className="text-inherit no-underline">{title}</Link>
      </Box>
    );
  } else {
    header = (
      <Box sx={{ color: "primary.main" }}>
        <Link href="/" className="text-inherit no-underline">{title}</Link>
      </Box>
    );
  }
  return header;
};

export default Header;
