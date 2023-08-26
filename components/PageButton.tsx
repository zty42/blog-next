import { ReactNode } from "react";

const PageButton = ({ children }:{children:ReactNode}) => {
  return (
    <span
    className="
    text-gray-900 font-medium py-2.5 mb-2
    hover:underline
    hover:decoration-pink-500
    dark:bg-gray-800 
    dark:text-white 
    dark:border-gray-600 
    dark:hover:bg-gray-700 
    dark:hover:border-gray-600"
    >
      {children}
    </span>
    )
};


export default PageButton;
