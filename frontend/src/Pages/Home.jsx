import React, { useEffect, useState } from "react";
import { getDetailsInCard } from "../Api/Basic";
import MediaCard from "../Components/Card";

export default function Home() {
  // we use "useEffect" -> when any change occur in the browser.

  // array
  // const food = ["apple", "orange", "mango", "banana"];

  // making an empty object - React.useState ->
  const [details, SetDetails] = useState([]);

  // State to hold the selected category, you can set a default category like 'Shoes'
  const [selectedCategory, setSelectedCategory] = useState("All");

  // useEffect --> auto fetching on loading pages
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Handle the response as needed
        const response = await getDetailsInCard();
        if (response.status) {
          console.log("product detail -", response.data);
          SetDetails(response.data); // details - array of objects
        }
      } catch (error) {
        console.log("product detail -" + error);
      }
    };
    fetchData();
    // food.map();
  }, []); // Empty dependency array means it runs once after initial render.

  // Filter details based on selectedCategory
  // Filter and sort details based on selected category and alphabetical order
  const filteredDetails =
    selectedCategory === "All"
      ? details
      : details.filter(
          (product) => product.ProductCategory === selectedCategory
        );

  // Sort filteredDetails alphabetically by ProductCategory
  const sortedDetails = filteredDetails.sort((a, b) =>
    a.ProductCategory.localeCompare(b.ProductCategory)
  );

  return (
    <div>
      {/* <h1>Home</h1> */}
      {/* Condition rendering -> before login and after login */}
      {/* {localStorage.getItem("Token") && (
        <div>
          <p>HELLO {user ? user.FullName : localStorage.getItem("Name")}</p>
        </div>
      )} */}

      {/* Search box */}
      <div className="flex justify-center items-center mt-8">
        <div className="flex space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm p-2 w-[600px]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-3 text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0"
          />
          <button className="bg-[#AD825C] text-white rounded-lg p-3 hover:bg-[#8C5A4F] transition-colors duration-300 ease-in-out">
            Search
          </button>
        </div>
      </div>

      {/* slider */}

      {/* cards - foreach used to display card*/}

      {/* Category Selection */}
      {/* Category Selection */}
      <div className="flex justify-center mt-4">
        <div className="flex space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm p-2 w-[600px]">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-center w-full p-3 text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0"
          >
            <option value="All">All Categories</option>
            <option value="Bangles">Bangles</option>
            <option value="Belt">Belt</option>
            <option value="Earrings">Earrings</option>
            <option value="Handbags">Handbags</option>
            <option value="Ring">Ring</option>
            <option value="Scarves">Scarves</option>
            <option value="Shoes">Shoes</option>
            <option value="Wallets">Wallets</option>
            <option value="Watches">Watches</option>
          </select>
        </div>
      </div>

      {/* Display the heading based on selected category */}
      <h1 className="text-2xl font-bold mt-8 mb-6 text-center">
        {selectedCategory === "All"
          ? "All Products"
          : `${selectedCategory} Products`}
      </h1>

      {/* Cards */}
      {sortedDetails.length > 0 ? (
        <div className="p-4 bg-gray-500 mt-8 rounded-lg ml-10 mr-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedDetails.map((element, index) => (
              <div key={index} className="flex justify-center">
                <MediaCard given={element} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-white mt-8">No products available</p>
      )}

      {/* {details && (
        <div className="p-4 bg-gray-500 mt-8 rounded-lg ml-10 mr-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {details.map((element, index) => (
              <div key={index} className="flex justify-center">
                <MediaCard given={element} />
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* <h1>search box - left side and right side - wishlist</h1>
      <h1>carousel</h1>
      <h1>Best choice</h1>
      <h1>4 - cards - </h1>
      <h1>contact form - right and location - left</h1> */}
    </div>
  );
}
