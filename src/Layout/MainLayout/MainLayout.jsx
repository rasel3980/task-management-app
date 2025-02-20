import { Outlet } from "react-router-dom";
import Login from "../../Pages/Login/Login";

const MainLayout = () => {
    return (
        <div>
            <Login></Login>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;