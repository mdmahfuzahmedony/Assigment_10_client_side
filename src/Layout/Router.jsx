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
        loader: () =>
          fetch("https://assigmen-10-server-side.vercel.app/carProduct"),
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
          <PrivetRouter2>
            <CarDetailsPage />
          </PrivetRouter2>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assigmen-10-server-side.vercel.app/cardetails/${params.id}`
          ),
      },
      {
        path: "/add-car",

        element: (
          <PrivetRouter2>
            <AddCars />
          </PrivetRouter2>
        ),
      },
      {
        path: "/my-listings",
        element: (
          <PrivetRouter2>
            <MyLIsting />
          </PrivetRouter2>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivetRouter2>
            <MyBookings />
          </PrivetRouter2>
        ),
      },
      {
        path: "/update_car/:id",
        element: (
          <PrivetRouter2>
            <UpdateCar />
          </PrivetRouter2>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assigmen-10-server-side.vercel.app/cardetails/${params.id}`
          ),
      },
    ],
  },
]);
