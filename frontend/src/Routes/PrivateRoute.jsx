import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);
  return user && allowedRoles.includes(user.role)
    ? <Outlet />
    : <Navigate to="/login" />;
};

export default PrivateRoute;
