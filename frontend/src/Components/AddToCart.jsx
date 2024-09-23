import React from "react";
import { TiShoppingCart } from "react-icons/ti";

export default function AddToCart() {
  return (
    <div className=" w-full mb-[30px] bg-black text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-gray-950 transition duration-150 ease-in-out hover:shadow-lg active:bg-gray-900">
      <div className="flex flex-row gap-3 justify-center">
        <TiShoppingCart className="text-[25px] hover:text-[30px] " />
        <button type="submit" className="justify-center">
          Add To Cart
        </button>
      </div>
    </div>
  );
}

// className = "flex flex-row";
