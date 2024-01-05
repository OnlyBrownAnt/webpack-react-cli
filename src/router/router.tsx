import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '@/App';
import ReduxDemo from '@/pages/ReduxDemo/index';
import CSSModule from "@/pages/CSSModule/CSSModule";
import Error404 from '@/pages/Error404';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // loader: () => {
        //     throw new Error('1');
        // },
        children: [
            {
                path: "/redux-demo",
                element: <ReduxDemo />,
                children: [], 
            },
            {
                path: "/css-module",
                element: <CSSModule />,
                children: [], 
            }
        ],
    },
    {
        path: "*",
        element: <Error404 />,
        children: [], 
    }
], { basename: process.env.REACT_APP_ENV == 'dev' ? '/' :  process.env.REACT_APP_PUBLIC_URL }); // dev 测试环境的应用路径是 './' 需要额外处理。

const ReactRouterProvider: React.FC = () => {
    return (
        <RouterProvider router={router}/>
    )
}

export default ReactRouterProvider;