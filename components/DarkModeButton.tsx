import useDarkMode from "use-dark-mode";
import Moon from "./icons/Moon";
import Sun from "./icons/Sun";
const DarkmodeButton = () => {
  const mode = useDarkMode(false, {
    classNameDark: "dark",
    classNameLight: "light",
  });

  return (
    <button onClick={mode.toggle}>{mode.value ? <Moon /> : <Sun />}</button>
  );
};

export default DarkmodeButton;
