import * as React from "react";
import * as ReactDOM from "react-dom/client";
import ReactRouterProvider from "./router/router";
import ErrorBoundary from "@/pages/ErrorBoundary/index";
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ErrorBoundary>
    <ReactRouterProvider />
  </ErrorBoundary>,
);
