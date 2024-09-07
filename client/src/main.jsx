import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Manager from "./pages/manager/Manager.jsx";
import Create from "./pages/create/Create.jsx";
import Site from "./pages/site/Site.jsx";
import About from "./pages/about/About.jsx";

import "./resets.css";
import "./utils.css";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <NotFound /> },
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
