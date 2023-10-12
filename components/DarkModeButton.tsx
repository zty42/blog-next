import useDarkMode from "use-dark-mode";
import Image from "next/image";
const DarkmodeButton = () => {
  const mode = useDarkMode(false, {
    classNameDark: "dark",
    classNameLight: "light",
  });

  return (
    <button onClick={mode.toggle}>
      <Image
        alt="dark mode"
        src={mode.value ? "/moon.svg" : "/sun.svg"}
        width={24}
        height={24}
        className="my-0 hover:rotate-45 transition-all duration-300"
        suppressHydrationWarning={true}
      />
    </button>
  );
};

export default DarkmodeButton;
