import { createBrowserRouter } from "react-router";
import MainRouter from "./MainRouter";
import Home from "../Pages/Home";
import Footer from "../Component/Footer";

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
    
    ],
  },
]);
