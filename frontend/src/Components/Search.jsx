import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Search(props) {
  // user data
  // records are product action

  // product details
  // const details = props.given.element;
  // console.log("Product details details : " + details);

  return (
    <div className="flex justify-center w-full">
      <div
        className={` flex bg-white w-[90%]  rounded-full justify-between h-[40px]`}
      >
        <input
          type="text"
          placeholder="Search for a product..."
          className="w-full placeholder:text-[12px] text-red-600 bg-transparent border-none focus:outline-none focus:ring-0 pl-5"
        />
        <div className=" bg-black w-[70px] flex justify-center rounded-r-full pt-3">
          <FaSearch className=" text-white hover:text-[aqua] cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
