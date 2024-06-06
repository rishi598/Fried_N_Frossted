import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/Menu/Menu";
import Signup from "../components/Signup";

import UpdateProfile from "../pages/profile/UpdateProfile";
import Cart from "../pages/cart/Cart";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";

import Login from "../components/Login";
import Users from "../pages/dashboard/admin/Users";
import Checkout from "../pages/checkout/Checkout";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import PaymentForm from "../pages/checkout/PaymentForm";
import CheckoutSuccess from "../components/CheckoutSuccess";
import Order from "../pages/dashboard/Order";
import OrderTracking from "../pages/dashboard/OrderTracking";
import ManageOrders from "../pages/dashboard/admin/ManageOrders";



const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/menu",
          element: <Menu/>
        },
        {
          path: "/cart",
          element: <Cart/>
        },
        {
          path: '/order',
          element: <Order/>
        },
        {
          path: '/track-order/:id',
          element: <OrderTracking/>
        },
        {
          path: "/checkout",
          element: <PaymentForm/>
        },
        {
          path: '/checkout-success',
          element: <CheckoutSuccess/>
        },
        {
          path: "/update-profile",
          element: <UpdateProfile/>
        },
        
        
      ]
    },
    {
      path: "/signup",
      element:<Signup/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "dashboard",
      element: <DashboardLayout/>,
      children: [
        {
          path: '',
          element: <Dashboard/>
        },
        {
          path: 'users',
          element: <Users/>
        },
        {
          path: 'add-menu',
          element: <AddMenu/>
        },
        {
          path: 'manage-items',
          element:<ManageItems/>
        },
        {
          path: 'mangage-orders',
          element:<ManageOrders/>
        },
        {
          path: 'update-menu/:id',
          element:<UpdateMenu/>,
          loader:({params}) => fetch(`http://localhost:6001/menu/${params.id}`)
        }
      ]
    }
  ]);

  export default router;