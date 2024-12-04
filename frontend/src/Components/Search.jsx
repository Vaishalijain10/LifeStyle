import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { productUrl } from "./functions/urls";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  // Handle search input changes
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim() !== "") {
      try {
        // Fetch products matching the query from the server
        const response = await axios.get(
          `${productUrl}/searchProducts?q=${query}`
        );
        console.log("testing0 : " + response);
        console.log("testing1 : " + response.data);
        if (response.data.status) {
          console.log("testing2 : " + response.data.data);
          setSearchResults(response.data.data); // Update the search results
        } else {
          setSearchResults([]); // Clear if no results
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]); // Clear results if input is empty
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div
        className={` flex bg-white w-[90%]  rounded-md justify-between h-[40px]`}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search.."
          className="w-full placeholder:text-[12px] text-red-600 bg-transparent border-none focus:outline-none focus:ring-0 pl-5"
        />
        <div className=" bg-black w-[70px] flex justify-center rounded-r-md pt-3">
          <FaSearch className=" text-white hover:text-[aqua] cursor-pointer" />
        </div>
      </div>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="absolute text-black bg-white xl:w-[420] lg:w-[340px] md:w-[300px] sm:w-[300px] mt-12 rounded-md shadow-md max-h-[200px] overflow-y-auto">
          {searchResults.map((product) => (
            <div
              key={product._id}
              className="p-2 text-black hover:bg-gray-200 cursor-pointer border-[1px] border-gray-300"
              onClick={() => {
                console.log("Selected product:", product.Name);
                navigate(`ProductDetails/${product._id}`);
              }}
            >
              {product.Name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
