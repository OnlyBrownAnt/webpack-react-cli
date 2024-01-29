import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/store/store";
import { useNavigate, Link, Outlet, ScrollRestoration } from "react-router-dom";
import ErrorBoundary from "./pages/ErrorBoundary";

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("error", function (event) {
      console.warn("error", event);
    });
    window.addEventListener("unhandledrejection", function (event) {
      console.warn("unhandledrejection", event);

      if (event.reason.code == 10004) {
        // TODO 登陆失效处理
        navigate("/", { replace: true });
      } else if (event.reason.code == 10005) {
        // TODO 刷新 Access Token 和 重试请求队列 场景
        // refreshToken 失效处理
        navigate("/", { replace: true });
      }
    });
  }, []);
  return (
    <>
      <Link to="/" replace={true}>
        back home link
      </Link>
      <button
        onClick={() => {
          navigate("/css-module");
        }}
      >
        css-module
      </button>
      <button
        onClick={() => {
          navigate("/task-calendar");
        }}
      >
        task-calendar
      </button>
      <Outlet />
    </>
  );
};

const ReduxProvider: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
      <ScrollRestoration
        getKey={(location, matches) => {
          const paths: string | string[] = [];
          return paths.includes(location.pathname)
            ? // home and notifications restore by pathname
              location.pathname
            : // everything else by location like the browser
              location.key;
        }}
      />
    </Provider>
  );
};

const ErrorBoundaryProvider: React.FC = () => {
  return (
    <ErrorBoundary>
      <ReduxProvider />
    </ErrorBoundary>
  );
};

export default ErrorBoundaryProvider;
