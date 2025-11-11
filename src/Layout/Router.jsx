import { createBrowserRouter } from "react-router";
import MainRouter from "./MainRouter";
import Home from "../Pages/Home";
import Footer from "../Component/Footer";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import CarallProduct from "../Pages/CarallProduct";

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
        loader:()=>fetch("http://localhost:2001/carProduct")
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },{
        path:"/carallproduct",
        Component:CarallProduct,
        loader:() =>fetch("http://localhost:2001/carProduct")
      }
    ],
  },
]);
