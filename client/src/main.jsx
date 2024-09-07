import React from "react";
import ReactDOM from "react-dom/client";
import "./resets.css";
import "./utils.css";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Manager from "./pages/manager/Manager.jsx";
import Create from "./pages/create/Create.jsx";
import Site from "./pages/site/Site.jsx";
import About from "./pages/about/About.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <NotFound /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  {
    path: "/manager",
    element: <Manager />,
    errorElement: <h1>Unauthorize</h1>,
  },
  { path: "/create", element: <Create />, errorElement: <h1>Unauthorize</h1> },
  { path: "/site/:id", element: <Site />, errorElement: <h1>Unauthorize</h1> },
  { path: "/about", element: <About /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
