import React, { useEffect } from 'react'
import { Provider } from 'react-redux';
import store from '@/store/store';
import { useNavigate, Link, Outlet, ScrollRestoration } from 'react-router-dom';
import ErrorBoundary from './pages/ErrorBoundary';

const App: React.FC = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    window.addEventListener('error', function(event) {
      console.warn('error', event);
    })
    window.addEventListener('unhandledrejection', function(event) {
      console.warn('unhandledrejection', event);
    });
  }, [])
  return (<>
    <Link to="/" replace={true}>back home link</Link>
    <button onClick={() => {navigate("/css-module")}}>css-module</button>
    <Outlet/>
  </>);
}

const ReduxProvider: React.FC = () => {
  return (
    <Provider store={store}>
      <App/>
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
  )
}

const ErrorBoundaryProvider: React.FC = () => {
  return (
    <ErrorBoundary>
      <ReduxProvider />
    </ErrorBoundary>
  )
}

export default ErrorBoundaryProvider;