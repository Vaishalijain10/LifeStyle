import React, { useEffect, useState } from "react";
import { getDetailsInCard } from "../Api/Basic";
import Card from "../Components/Card";
import { FaSearch } from "react-icons/fa";

export default function Home(props) {
  // we use "useEffect" -> when any change occur in the browser.

  // userData to send it to our component - card - to feature the like button
  const user = props.userData;

  // array - testing
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

      <div className="flex justify-between items-center w-full pl-3 pr-3  bg-[#6CBEC7] ">
        {/* Username */}
        <div className="flex-shrink-0 pt-8 ml-10  ">
          <p className="text-[20px] font-semibold  ">
            Hey, {props.userData ? props.userData.FullName : "User!"}
          </p>
        </div>

        {/* Centered Search Box and Category Filter */}
        <div className="flex items-center space-x-3 mx-auto">
          {/* Category Selection */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-center p-1 w-[180px] text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
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

          {/* Search Box */}
          <div className="flex bg-white border border-gray-300 rounded-lg shadow-sm p-0 w-[380px] h-[38px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-3 text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0"
            />
            <button className="bg-[#AD825C] text-white rounded-lg mt-1 pl-1 pr-1 mr-1 h-[30px] hover:bg-[#8C5A4F] transition-colors duration-300 ease-in-out">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      <div className="p-1 bg-[#6C4E31]  mt-3 rounded-lg ml-5 mr-5">
        {/* Display the heading based on selected category */}
        <h1 className="text-2xl font-bold mt-4 mb-6 text-center text-white uppercase tracking-widest">
          {selectedCategory === "All"
            ? "All Products"
            : `${selectedCategory} Products`}
        </h1>

        {/* Cards */}
        {details.length > 0 && sortedDetails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ml-5 mr-5">
            {sortedDetails.map((element, index) => (
              <div key={index} className="flex justify-center">
                <Card given={{ element, user }} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-white mt-8">No products available</p>
        )}
      </div>
    </div>
  );
}
