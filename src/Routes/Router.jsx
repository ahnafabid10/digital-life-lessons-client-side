import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../RootLayout/RootLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PublicLessons from "../Pages/PublicLessons/PublicLessons";
import Pricing from "../Pages/Pricing/Pricing"
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../Layout/DashboardLayout";
import AddLesson from "../Pages/Dashboard/AddLesson/AddLesson";
import MyLessons from "../Pages/Dashboard/MyLessons/MyLessons";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import ApprovedLessons from "../Pages/Dashboard/ApprovedLessons/ApprovedLessons";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoutes from "./AdminRoutes";
import Profile from "../Pages/Profile/Profile";


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
          element:<PublicLessons></PublicLessons>
        },
        {
          path: '/pricing',
          element: <PrivateRoutes><Pricing></Pricing></PrivateRoutes>
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
          path:'/profile',
          Component: Profile
        },
        {
            path: '/*',
            element: <ErrorPage></ErrorPage>
        }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
    children: [
      {
        index: true,
        path: 'add-lesson',
        element: <AddLesson></AddLesson>
      },
      {
        path:'my-lessons',
        element: <MyLessons></MyLessons>
      },
      {
        path:'payment/:userId',
        Component: Payment
      },
      {
        path:'payment-success',
        Component: PaymentSuccess
      },
      {
        path:'payment-cancelled',
        Component: PaymentCancelled
      },
      {
        path:'payment-history',
        Component: PaymentHistory
      },
      {
        path:'admin/manage-lessons',
        //manage lesson ----> approved lesson
        element: <AdminRoutes><ApprovedLessons></ApprovedLessons></AdminRoutes> 


      },
      {
        path:'admin/manage-users',
        element: <AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
      },
    ]
  }
  
]);

