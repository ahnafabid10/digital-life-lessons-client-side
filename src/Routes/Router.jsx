import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../RootLayout/RootLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PublicLessons from "../Pages/PublicLessons/PublicLessons";
import Pricing from "../Pages/Pricing/Pricing"
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import PrivateRoutes from "./PrivateRoutes";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    element: <ErrorPage></ErrorPage>,
    children: [
        {
            path: '/',
            Component: Home
        },
        {
          path: '/publicLessons',
          element:<PrivateRoutes><PublicLessons></PublicLessons></PrivateRoutes>
        },
        {
          path: '/pricing',
          Component: Pricing
        },
        {
          path: '/login',
          Component: Login
        },
        {
          path: '/register',
          Component: Register
        },
        {
            path: '/*',
            element: <ErrorPage></ErrorPage>
        }
    ]
  },
  
]);

