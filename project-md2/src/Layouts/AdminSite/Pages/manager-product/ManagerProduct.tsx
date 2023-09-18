import React from "react";
import Pagination from "../../Components/pagination/Pagination";
import Header from "../../Components/Layouts/Header";
import TableProduct from "../../Components/Table/TableProduct";

const ManagerProducts = () => {
  return (
    <div className="mx-10 mt-5 ">
      <Header title={"QUẢN LÝ SẢN PHẨM"} />

      <div className="mt-4">
        <TableProduct />
      </div>

      <div className="m-10 text-center ">
        <Pagination />
      </div>
    </div>
  );
};

export default ManagerProducts;
