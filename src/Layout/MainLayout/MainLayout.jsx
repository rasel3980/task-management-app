import { Outlet } from "react-router-dom";
import Login from "../../Pages/Login/Login";
import Logout from "../../Components/Logout";

const MainLayout = () => {
    return (
        <div>
            <div className="flex">
            <Login></Login>
            <Logout></Logout>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;