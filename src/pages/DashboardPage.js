import React from "react";
import { isAdmin } from "util/index";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  if (!isAdmin()) return <Navigate to="/loans" />;

  return <div>Dashboard Page</div>;
};

export default DashboardPage;
