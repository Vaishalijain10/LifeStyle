import React, { useEffect, useState } from "react";
import { getDetailsInCard } from "../Api/Basic";
import Card from "../Components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecords } from "../redux/slices/productAction";

// Import images
// import ALL from "../images/ALL.png";
import Bangles from "../images/1BANGLES.jpg";
import Belt from "../images/1BELT.jpg";
import Earrings from "../images/1EARRING.jpg";
import Handbags from "../images/1HANDBAG.jpg";
import Ring from "../images/1RING.jpg";
import Scarves from "../images/1Scarves.jpg";
import Shoes from "../images/1SHOES.jpg";
import Wallets from "../images/1WALLETS.jpg";
import Watches from "../images/1WATCHES.jpg";
import ALL from "../images/All.png";
// import Search from "../Components/Search";
import AdsCarousel from "../Components/AdsCarousel";

export default function Home() {
  // we use "useEffect" -> when any change occur in the browser.
  // userData to send it to our component - card - to feature the like button
  const user = useSelector((state) => state.user);
  // making an empty object - React.useState ->
  const [details, SetDetails] = useState([]);
  // State to hold the selected category, you can set a default category like 'Shoes'
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();

  // Fetch user product records and product details on page load
  useEffect(() => {
    if (user.userData?._id) {
      dispatch(fetchRecords(user.userData._id)); // Fetch liked products
    }
    const fetchData = async () => {
      try {
        const response = await getDetailsInCard();
        if (response.status) {
          SetDetails(response.data); // Load all product details
        }
      } catch (error) {
        console.log("Error fetching product details: ", error);
      }
    };
    fetchData();
  }, [user.userData?._id, dispatch]); // Dependencies ensure this runs when user ID is available

  // Category images (replace with your actual images)
  // Category images
  const categories = [
    { name: "All", image: ALL },
    { name: "Bangles", image: Bangles },
    { name: "Belt", image: Belt },
    { name: "Earrings", image: Earrings },
    { name: "Handbags", image: Handbags },
    { name: "Ring", image: Ring },
    { name: "Scarves", image: Scarves },
    { name: "Shoes", image: Shoes },
    { name: "Wallets", image: Wallets },
    { name: "Watches", image: Watches },
  ];

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
    <div className="m-5 ">
      <AdsCarousel />

      {/* Category Selector - Horizontal Scroll */}
      <h1 className="text-2xl font-bold mt-4 mb-6 text-center text-black uppercase tracking-widest">
        Select Category
      </h1>
      <div className="flex overflow-x-auto space-x-4 pt-4 pb-4 ml-10">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`cursor-pointer flex-shrink-0 ${
              selectedCategory === category.name
                ? "border-b-4 border-[#AD825C]"
                : ""
            }`}
          >
            <img
              src={category.image}
              alt={category.name}
              className={`rounded-full w-24 h-24 object-cover transition duration-300 ease-in-out ${
                selectedCategory === category.name
                  ? "border-2 border-[#AD825C]"
                  : "hover:border-b-2 hover:border-[#AD825C]"
              }`}
            />
            <p className="text-center mt-2">{category.name}</p>
          </div>
        ))}
      </div>

      {/* category name display */}
      <div className="rounded-lg">
        <h1 className="text-2xl font-bold mt-4 mb-6 text-center text-black uppercase tracking-widest">
          {selectedCategory === "All"
            ? "All Products"
            : `${selectedCategory} Products`}
        </h1>

        {/* Cards */}
        {details.length > 0 && sortedDetails.length > 0 ? (
          <div className="w-full px-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {sortedDetails.map((element, index) => (
              <div key={index} className="flex justify-center">
                <Card given={element} />
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
