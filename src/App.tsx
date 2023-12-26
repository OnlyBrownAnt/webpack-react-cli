import * as React from 'react'
import './index.less'
const testPng = require("./assets/imgs/arithmetic-1.png");
const App: React.FC = () => {
  return <>
    <div className="wrapper">
      hello {process.env.REACT_APP_PUBLIC_URL}
      <img src={testPng}></img>
    </div>
  </>
}

export default App