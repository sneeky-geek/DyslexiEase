import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log("🔹 ProtectedRoute Component Executed");

  const token = sessionStorage.getItem("authToken");
  console.log("🔍 Checking auth in ProtectedRoute:", token);

  if (isAuthenticated) {
    console.log("✅ Token found! Granting access.");
    return <Outlet />;
  } else {
    console.log("❌ No token found! Redirecting to /login");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
