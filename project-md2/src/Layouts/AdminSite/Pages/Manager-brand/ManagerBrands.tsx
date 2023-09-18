import React from "react";
import Header from "../../Components/Layouts/Header";
import Pagination from "../../Components/pagination/Pagination";
import TableBrands from "../../Components/Table/TableBrand";

const ManagerBrands = () => {
  return (
    <div className="ml-10 mt-5">
      <Header title={"QUẢN LÝ THƯƠNG HIỆU"} />

      <div className="mt-4">
        <TableBrands />
      </div>

      <div className="m-10 text-center ">
        <Pagination />
      </div>
    </div>
  );
};

export default ManagerBrands;
