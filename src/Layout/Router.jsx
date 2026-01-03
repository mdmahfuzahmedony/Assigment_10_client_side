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
import UpdateCar from "../Pages/UpdateCar";
import PrivetRouter2 from "../Pages/PrivetRouter2";
import ErrorPage from "../Pages/ErrorPage";
import Dashboard from "../Pages/Dashboard/page";
import AddCar from "../Pages/AddCars";
import MyProfile from "../Pages/Dashboard/MyProfile/myprofile";
import About from "../Pages/About/About";
import BlogPage from "../Pages/Blog/Blog";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainRouter,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/home",
        Component: Home,
        // loader: () =>http://https://assigmen-10-server-side.vercel.app
        //   fetch("http://https://assigmen-10-server-side.vercel.app/carProduct"),
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
        path: "/browsecars",
        Component: BrowseCars,
        loader: () =>
          fetch("https://assigmen-10-server-side.vercel.app/carProduct"),
      },
      {
        path: "/cardetails/:id",
        element: (

          <CarDetailsPage />

        ),
        loader: ({ params }) =>
          fetch(
            `https://assigmen-10-server-side.vercel.app/cardetails/${params.id}`
          ),
      },
      {
        path:"/about",
        element: <About></About>

      },
      {
        path:"/blogs",
        element:<BlogPage></BlogPage>

      },
   

      //dashboard route here

      {
        path: "/dashboard",
        Component: Dashboard,
        children: [

          {
            index: true,
            element: (
              <MyProfile></MyProfile>
            ),
          },
          {
            path: "add-car",
            element: (
              <AddCar></AddCar>
            ),
          },
          {
            path: "my-listings",
            element: (
              <MyLIsting />
            ),
          },
          {
            path: "my-bookings",
            element: (
              <MyBookings />
            ),
          },
          {
            path: "update_car/:id",
            element: (
              <UpdateCar />
            ),
            loader: ({ params }) =>
              fetch(
                `https://assigmen-10-server-side.vercel.app/cardetails/${params.id}`
              ),
          },


        ],
      },


    ],
  },
]);
