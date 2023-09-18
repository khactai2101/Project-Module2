import React from "react";
import Header from "../../Components/Layouts/Header";
import Pagination from "../../Components/pagination/Pagination";
import TableCategory from "../../Components/Table/TableCategory";

const ManagerCategory = () => {
  return (
    <div className="ml-10 mt-5">
      <Header title={"QUẢN LÝ BÌNH LUẬN"} />

      <div className="mt-4">
        <TableCategory />
      </div>

      <div className="m-10 text-center   ">
        <Pagination />
      </div>
    </div>
  );
};

export default ManagerCategory;
