import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Error from "../Pages/Error/Error";
import TaskForm from "../Components/TaskForm";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children:[
        {
            path: "/",
            element:<Home></Home>
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/task-form",
            element: <PrivateRoute><TaskForm></TaskForm></PrivateRoute>
        }
    ]
  },
]);
export default router;