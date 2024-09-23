import React from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="bg-[#87945F] text-ellipsis text-center font-serif mb-[20px] p-3 mt-2 ml-2 mr-2 rounded">
        Explore Products Section!
      </h1>

      <div>
        <div className="flex gap-[15%]">
          <button
            onClick={() => navigate("/AddProducts")}
            className="w-[200px] md:w-[20%] ml-3 mt-4 mb-[30px] bg-[rgb(51,143,255)] text-white px-6 py-5 text-sm font-medium uppercase rounded shadow-md hover:bg-amber-900 transition duration-150 ease-in-out hover:shadow-lg active:bg-amber-900 "
          >
            Add a new Product
          </button>

          <button
            onClick={() => navigate("/AddProducts")}
            className="w-[200px] md:w-[20%] ml-3 mt-4 mb-[30px] bg-[rgb(51,143,255)] text-white px-6 py-5 text-sm font-medium uppercase rounded shadow-md hover:bg-amber-900 transition duration-150 ease-in-out hover:shadow-lg active:bg-amber-900 "
          >
            View Product
          </button>

          <button
            onClick={() => navigate("/AddProducts")}
            className="w-[200px] md:w-[20%] ml-3 mt-4 mb-[30px] bg-[rgb(51,143,255)] text-white px-6 py-5 text-sm font-medium uppercase rounded shadow-md hover:bg-amber-900 transition duration-150 ease-in-out hover:shadow-lg active:bg-amber-900 "
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
