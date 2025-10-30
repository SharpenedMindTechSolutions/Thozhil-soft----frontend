import React from "react";
import { Navigate } from "react-router-dom";

function ProtectRoutes({ children }) {
  const isAuthenticated = localStorage.getItem("isAdminLoggedIn") === "true";

  if (!isAuthenticated) {
    // Redirect to admin login if user is not logged in
    return <Navigate to="/adminlogin" replace />;
  }

  // If logged in, render the protected component
  return children;
}

export default ProtectRoutes;
