import React from 'react';
import "@/App.css";

const App: React.FC = () => {
  return (
    <div className="example">Hello React {add(1, 2)} </div>
  )
}

const add = (a: number, b: number) => { return a + b };

export default App;
