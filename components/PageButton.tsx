import { ReactNode } from "react";

const PageButton = ({ children }: { children: ReactNode }) => {
  return (
    <span
      className="font-medium py-2.5 mb-2 hover-link">
      {children}
    </span>
  );
};

export default PageButton;
