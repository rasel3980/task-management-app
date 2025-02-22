import { useContext } from "react";
import Loader from "../Pages/Loader/Loader";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show loader while loading authentication status
  if (loading) {
    return <Loader />;
  }

  // If user is authenticated, render the children (protected content)
  if (user) {
    return children;
  }

  // If not authenticated, redirect to login and preserve the current location for after login
  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
