import React from 'react';

const App: React.FC = () => {
  return (
    <div>Hello React {add(1, 2)} </div>
  )
}

const add = (a: number, b: number) => { return a + b };

export default App;
