import React from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Exploring Products!</h1>
      <div className="flex gap-[18%]">
        <button
          onClick={() => navigate("/AddProducts")}
          className="w-[20%] mb-[30px] bg-amber-950 text-white px-12 py-5 text-sm font-medium uppercase rounded shadow-md hover:bg-amber-900 transition duration-150 ease-in-out hover:shadow-lg active:bg-amber-900 "
        >
          Add a new Products
        </button>
      </div>

      <h1>category</h1>
      <ul>
        <li>Gold</li>
        <li>Silver</li>
        <li>Dusted black</li>
        <li>Multi-color</li>
      </ul>
      <br />
      <h1>Products</h1>
      <ul>
        <li>Ring</li>
        <li>earrings</li>
        <li>neck piece</li>
        <li>Nose ring</li>
        <li>bracelet</li>
        <li>Bangles</li>
        <li>Anklet</li>
        <li>Scrunchies</li>
        <li>Handbags</li>
        <li>Hats</li>
        <li>Scarves</li>
        <li>Watches</li>
        <li>Hair clips and bands </li>
        <li>Belt</li>
        <li>Toe ring</li>
        <li>Brooches and pins</li>
        <li>wallets</li>
      </ul>
    </div>
  );
}

export default Products;
