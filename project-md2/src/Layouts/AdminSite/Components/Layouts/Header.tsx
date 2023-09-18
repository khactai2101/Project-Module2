import React from "react";
import SearchForm from "../Search/SearchProduct";
import Modal from "../Modal/Modal";
import DefaultModal from "../Modal/Modal";

const Header = (props: any) => {
  return (
    <div className="">
      <div className="w-full mb-10 flex items-center gap-4">
        {/* <SearchForm /> */}

        {/* <DefaultModal /> */}
      </div>

      <h1>{props.title}</h1>
    </div>
  );
};

export default Header;
