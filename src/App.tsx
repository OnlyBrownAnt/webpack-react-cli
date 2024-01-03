import * as React from 'react'
import { useRef, useEffect } from 'react';
import './index.less'

import CSSModule from './pages/CSSModule/CSSModule';
import PDFView from './pages/PDFView/PDFView';
import ResizableDemo from './pages/ResizableDemo';
import EChartsDemo from './pages/EChartsDemo';

const App: React.FC = () => { 
  return <>
    {/* <CSSModule></CSSModule> */}
    {/* <PDFView></PDFView> */}
    {/* <ResizableDemo></ResizableDemo> */}
    <EChartsDemo></EChartsDemo> 
  </>
}

export default App