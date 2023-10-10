import useDarkMode from "use-dark-mode";
import Sun from "../assets/sun.svg";
import Moon from "../assets/moon.svg";
import Image from "next/image";
import { useEffect } from "react";
const DarkmodeButton = () => {
  const mode = useDarkMode(false, {
    classNameDark: "dark",
    classNameLight: "light",
  });

  useEffect(() => {

  })

  return (
    <button onClick={mode.toggle}>
      <Image
        alt="dark mode"
        src={mode.value ? Moon : Sun}
        width={24}
        height={24}
        className="my-0"
        suppressHydrationWarning={true}
      />
    </button>
  );
};

export default DarkmodeButton;
