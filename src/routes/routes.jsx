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
        loader:({params})=>fetch(`http://localhost:3000/card/${params.id}`),
        element:<CardDetails></CardDetails>
      }
    ],
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  },

]);