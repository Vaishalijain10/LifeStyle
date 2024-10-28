import React from "react";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";


export default function Search() {
  // user data
  const user = useSelector((state) => state.user);
  console.log("Like Product : user : ", user);
  // records are product action
  const records = useSelector((state) => state.productAction.records);
  console.log("Like Product : (records)productAction : ", records);
  // product details
  // const details = props.given.element;
  // console.log("Product details details : " + details);

  return (
    <div className="flex bg-white border border-gray-300 rounded-sm shadow-sm w-[500px] h-[38px] items-center mr-8">
      <input
        type="text"
        placeholder="Search..."
        className="w-full  text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 pl-5"
      />
      <button className=" text-black rounded-lg h-[30px]  px-2 mr-3">
        <FaSearch />
      </button>
    </div>
  );
}
