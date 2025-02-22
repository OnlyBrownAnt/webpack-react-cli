import React from "react";
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import App from "@/App";
import Error404 from "@/pages/error404/Error404";
import Home from "@/pages/home/Home";
import ReduxDemo from "@/pages/reduxDemo/ReduxDemo";
import PDFView from "@/pages/pdfView/PDFView";

const RootRouteComponent: React.FC = () => {
  return (
    <>
      <App />
      <ScrollRestoration
        getKey={(location, matches) => {
          return location.key;
        }}
      />
    </>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootRouteComponent />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/redux",
          element: <ReduxDemo />,
        },
        {
          path: "/pdfview",
          element: <PDFView />,
        },
      ],
    },
    {
      path: "*",
      element: <Error404 />,
    },
  ],
  {
    basename:
      process.env.NODE_ENV == "development" ? "/" : process.env.APP_PUBLIC_URL,
  },
);

export default router;
