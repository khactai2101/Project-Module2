import React from "react";
import Header from "../../Components/Layouts/Header";
import Pagination from "../../Components/pagination/Pagination";
import TableOrigin from "../../Components/Table/TableOrigin";

const MangerOrigin = () => {
  return (
    <div className="ml-10 mt-5">
      <Header title={"XUẤT XỨ"} />
      <div className="mt-4">
        <TableOrigin />
      </div>

      <div className="m-10 text-center ">
        <Pagination />
      </div>
    </div>
  );
};

export default MangerOrigin;
