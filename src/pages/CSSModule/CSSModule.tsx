import * as React from 'react'
import CSSModule1 from './CSSModule1.module.less';
import CSSModule2 from './CSSModule2.module.less';
const testPng = require("@/assets/imgs/arithmetic-1.png");

const CSSModule: React.FC = () => {
  return <>
    <div className={CSSModule1.wrapper}>
      hello {process.env.REACT_APP_PUBLIC_URL}
      <img src={testPng} className={CSSModule2.wrapper}></img>
    </div>
  </>
}

export default CSSModule;