import React, { useContext } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import { ThemeContext } from "@/theme/theme";

function ThemeDemo() {
  const themeMode = useContext(ThemeContext);

  return (
    <div>
      <Button />
      <Input></Input>
      <button onClick={themeMode.toggleThemeMode}>切换mode</button>
    </div>
  );
}
export default ThemeDemo;
