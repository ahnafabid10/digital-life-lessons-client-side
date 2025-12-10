import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../RootLayout/RootLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    element: <ErrorPage></ErrorPage>,
    children: [
        {
            path: '/',
            Component: Home
        }
    ]
  },
]);

