import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Login from "../components/Login/Login.jsx";
import Homes from "../components/home/Homes.jsx";
import Register from "../components/Register/Register.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element:<App />,
        children: [
        {
             path: "/",
             element: <Homes />,
        },
    {
        path: "/login",
        element:<Login />
    },
    {
        path: "/register",
        element:<Register />
    },
        ]
    }
])

export default router