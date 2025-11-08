import { createBrowserRouter } from "react-router";
import MainRouter from "./MainRouter";
import Home from "../Pages/Home";
import Footer from "../Component/Footer";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainRouter,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/home",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
