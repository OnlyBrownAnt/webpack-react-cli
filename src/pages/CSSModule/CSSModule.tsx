import * as React from 'react'
import CSSModule1 from './CSSModule1.module.less';
import CSSModule2 from './CSSModule2.module.less';
const testPng = require("@/assets/imgs/arithmetic-1.png");
import { useNavigate } from 'react-router-dom';
import { mockApi } from '@/service/common';

const CSSModule: React.FC = (error) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    mockApi({});
  }, [])
  return <>
    <button onClick={() => {navigate(-1)}}>Back Page</button>
    <button onClick={() => {navigate("/redux-demo")}}>redux-demo</button>
    <div className={CSSModule1.wrapper}>
      hello {process.env.REACT_APP_PUBLIC_URL}
      {/* <img src={testPng} className={CSSModule2.wrapper}></img> */}
    </div>
    <div className={CSSModule1.wrapper}>
      hello {process.env.REACT_APP_PUBLIC_URL}
      {/* <img src={testPng} className={CSSModule2.wrapper}></img> */}
    </div>
    <button onClick={() => {navigate(-1)}}>Back Page</button>
    <button onClick={() => {navigate("/redux-demo")}}>redux-demo</button>
  </>
}

export default CSSModule;