import * as React from 'react'
import './index.less'

import CSSModule from './pages/CSSModule/CSSModule';
import PDFView from './pages/PDFView/PDFView';
import ResizableDemo from './pages/ResizableDemo';
import EChartsDemo from './pages/EChartsDemo';

import { Provider } from 'react-redux';
import store from '@/store/store';
import ReduxDemo from './pages/ReduxDemo';

const App: React.FC = () => { 
  return <>
    <Provider store={store}>
      {/* <CSSModule></CSSModule> */}
      {/* <PDFView></PDFView> */}
      {/* <ResizableDemo></ResizableDemo> */}
      {/* <EChartsDemo></EChartsDemo>  */}
      <ReduxDemo></ReduxDemo>
    </Provider>
  </>
}

export default App;