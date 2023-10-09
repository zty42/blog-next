import { ReactNode } from "react";

const PageButton = ({ children }: { children: ReactNode }) => {
  return (
    <span
      className="
        text-gray-900 font-medium py-2.5 mb-2
        hover:underline"
    >
      {children}
    </span>
  );
};

export default PageButton;
