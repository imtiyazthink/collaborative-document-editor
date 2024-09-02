import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import DocumentEditor from './components/DocumentEditor';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { SocketProvider } from './context/SocketContext';

let router = createBrowserRouter([
  {
    path: "/",
    Component() {
      return <Login />;
    },
  },
  {
    path: "/dashboard",
    Component() {
      return <PrivateRoute element={<Dashboard />} />;
    },
  },
  {
    path: "/editor",
    Component() {
      return <PrivateRoute element={
        <SocketProvider>
          <DocumentEditor />
        </SocketProvider>
      } />;
    },
  },
]);

const App = () => {
  console.log("process.env.REACT_APP_BASE_URL: ", process.env.REACT_APP_BASE_URL)
  return (
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  );
};

export default App;
