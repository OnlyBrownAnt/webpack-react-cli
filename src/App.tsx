import * as React from 'react'
import './index.less'

import CSSModule from './pages/CSSModule/CSSModule';
import PDFView from './pages/PDFView/PDFView';

const App: React.FC = () => {
  return <>
    <CSSModule></CSSModule>
    <PDFView></PDFView>
  </>
}

export default App