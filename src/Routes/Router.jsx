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
import LifeLessonDetails from "../Pages/Dashboard/LifeLessonDetails/LifeLessonDetails";
import ProfilePage from "../Pages/Dashboard/ProfilePage/ProfilePage";
import Dashboard from "../Layout/Dashboard";
import MyFavourite from "../Pages/Dashboard/MyFavourite/MyFavourite";
import UpdateLessons from "../Pages/Dashboard/UpdateLessons/UpdateLessons";
import Admin from "../Pages/Dashboard/Admin/Admin";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
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
          path:'/profilePage/:_id',
          element: <PrivateRoutes><ProfilePage></ProfilePage></PrivateRoutes>
        },
        {
          path:`/lessonsDetails/:_id`,
          element: <PrivateRoutes><LifeLessonDetails></LifeLessonDetails></PrivateRoutes>,
            // loader: ({params}) => fetch(`http:localhost:3000/lessons/${params.id}`)
        },
        
    ]
  },
  {
    path: 'dashboard/',
    element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>
      },
      {
        path: 'add-lesson',
        element: <AddLesson></AddLesson>
      },
      {
        path: 'update-lesson/:_id',
        element: <UpdateLessons></UpdateLessons>
      },
      {
        path:'my-lessons',
        element: <MyLessons></MyLessons>
      },
      {
        path:'my-favourite',
        element: <MyFavourite></MyFavourite>
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
      {
        path:'admin',
        element: <AdminRoutes><Admin></Admin></AdminRoutes>
      },
    ]
  },
  {
            path: '/*',
            element: <ErrorPage></ErrorPage>
    
  }
  
]);

