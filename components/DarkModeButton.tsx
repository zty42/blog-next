import useDarkMode from "use-dark-mode";
import Sun from "../assets/sun.svg";
import Moon from "../assets/moon.svg";
import Image from "next/image";
const DarkmodeButton = () => {
  const mode = useDarkMode(false, {
    classNameDark: "dark",
    classNameLight: "light",
  });

  return (
    <button onClick={mode.toggle}>
      {mode.value ? (
        <Image
          alt="dark mode"
          src={Moon}
          width={24}
          height={24}
          className="my-0"
        />
      ) : (
        <Image
          alt="light mode"
          src={Sun}
          width={24}
          height={24}
          className="my-0"
        />
      )}
    </button>
  );
};

export default DarkmodeButton;
