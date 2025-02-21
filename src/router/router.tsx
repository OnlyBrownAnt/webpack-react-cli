import React from "react";
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/home/Home";
import Error404 from "@/pages/error404/Error404";

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
