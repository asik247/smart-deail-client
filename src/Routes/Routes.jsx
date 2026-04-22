import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home";
import Registation from "../Pages/Registation";
import Login from "../Pages/Login";

const router = createBrowserRouter([
    {
        path:'/',
        Component:Root,
        children:[
            {index:true,Component:Home},
            {path:'/registation',Component:Registation},
            {path:'login',Component:Login}
        ]
    }
])
export default router;
