import { createBrowserRouter } from "react-router";
import MainRouter from "./MainRouter";
import Home from "../Pages/Home";
import Footer from "../Component/Footer";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import BrowseCars from "../Pages/BrowseCars";
import CarDetailsPage from "../Pages/CarDetailsPage";
import AddCars from "../Pages/AddCars";
import MyLIsting from "../Pages/MyLIsting";
import MyBookings from "../Pages/MyBookings";

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
      },
      {
        path:"/browsecars",
        Component:BrowseCars,
        loader:() =>fetch("http://localhost:2001/carProduct")
      },
      {
        path:"/cardetails/:id",
        Component:CarDetailsPage,
        loader:({params})=>fetch(`http://localhost:2001/cardetails/${params.id}`)

      },
      {
        path:"/add-car",
        Component:AddCars,
      },{
        path:"/my-listings",
        Component:MyLIsting
      },
      {
        path:"/my-bookings",
        Component:MyBookings
      }
     
    ],
  },
]);
