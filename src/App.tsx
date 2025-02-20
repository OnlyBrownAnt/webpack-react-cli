import React from "react";
import * as S from "@/App.module.css";

const App: React.FC = () => {
  return <div className={S.example}>Hello React {add(1, 2)} </div>;
};

const add = (a: number, b: number) => {
  return a + b;
};

export default App;
