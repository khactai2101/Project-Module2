import React from "react";

import Sidebar from "../../Components/Layouts/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex w-full gap-1">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
