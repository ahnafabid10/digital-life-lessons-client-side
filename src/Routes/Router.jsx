import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../RootLayout/RootLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PublicLessons from "../Pages/PublicLessons/PublicLessons";
import Pricing from "../Pages/Pricing/Pricing"


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
          Component: PublicLessons
        },
        {
          path: '/pricing',
          Component: Pricing
        },
        {
            path: '/*',
            element: <ErrorPage></ErrorPage>
        }
    ]
  },
]);

