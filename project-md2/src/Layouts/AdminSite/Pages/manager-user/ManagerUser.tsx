import React from "react";
import Header from "../../Components/Layouts/Header";
import TableUser from "../../Components/Table/TableUser";
import Pagination from "../../Components/pagination/Pagination";

const ManagerUser = () => {
  return (
    <div className="ml-10 mt-5">
      <Header title={"QUẢN LÝ NGƯỜI DÙNG"} />
      <div className="mt-4">
        <TableUser />
      </div>
      <div className="m-10 text-center ">
        <Pagination />
      </div>
    </div>
  );
};

export default ManagerUser;
