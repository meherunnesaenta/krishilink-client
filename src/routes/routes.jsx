import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import AllCrops from "../pages/AllCrops";
import Profile from "../pages/Profile";
import Login from "../components/Login/Login";
import PrivateRoute from "../Context/PrivateRoute";
import Register from "../components/Register/Register";
import CardDetails from "../components/Card/CardDetails";
import MyInterest from "../components/MyInterest/MyInterest";

import MyPost from "../pages/MyPost";
import AddCrops from "../pages/AddCrops";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/all-crops',
        element: <AllCrops></AllCrops>
      },
      {
        path: '/profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path:'/card/:id',
        loader:({params})=>fetch(`https://krishilink-xi.vercel.app/card/${params.id}`),
        element:<PrivateRoute><CardDetails></CardDetails></PrivateRoute>
      },
      {
        path:'/my-interests',
        element:<PrivateRoute><MyInterest></MyInterest></PrivateRoute>
      },
      {
        path :'/add-crop',
        element:<PrivateRoute><AddCrops></AddCrops></PrivateRoute>
      },
      {
        path:'/my-posts',
        element:<PrivateRoute><MyPost></MyPost></PrivateRoute>
      }
    ],
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  },

]);