import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home";
import Registation from "../Pages/Registation";
import Login from "../Pages/Login";
import AllProducts from "../Pages/AllProducts";
import MyProducts from "../Pages/MyProducts";
import MyBids from "../Pages/MyBids";
import AuthLayouts from "../Layouts/AuthLayouts";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            { index: true, Component: Home },
            { path: 'allProducts', Component: AllProducts },
            { path: 'myProducts', Component: MyProducts },
            { path: 'myBids', Component: MyBids },

        ]
    },
    {
        path: 'auth',
        Component: AuthLayouts,
        children: [
            { index: true, Component: Login },
            { path: 'registation', Component: Registation },

        ]
    }
])
export default router;
