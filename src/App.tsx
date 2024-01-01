import * as React from 'react'
// import './index.less'
import indexStyle1 from './index1.module.less';
import indexStyle2 from './index2.module.less';

const testPng = require("./assets/imgs/arithmetic-1.png");
const App: React.FC = () => {
  return <>
    <div className={indexStyle1.wrapper}>
      hello {process.env.REACT_APP_PUBLIC_URL}
      <img src={testPng} className={indexStyle2.wrapper}></img>
    </div>
  </>
}

export default App