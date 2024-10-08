import { useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.setAttribute("data-them", theme);
    } else {
      setTheme("light");
      document.documentElement.setAttribute("data-them", theme);
    }
  };

  return { theme, toggleTheme };
};

export default useTheme;
