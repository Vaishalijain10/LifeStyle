import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductDetails } from "../Api/Basic";
// import LikeProduct from "../Components/LikeProduct";
import AddToCart from "../Components/AddToCart";
// import { useSelector } from "react-redux"; 

export default function ProductDetails() {
  // get id of the card clicked to fetch the details from the db

  // Use useSearchParams hook to get URL parameters
  const location = useLocation();
  // console.log("location : ", location);
  const ProductIdFromUrl = location.pathname.slice(16);
  // console.log(ProductIdFromUrl);

  // use state -> its for product details
  const [details, setDetails] = useState({});

  // const user_details = useSelector((state) => state.user);

  // use effect -> fetching Product Details from database and displaying through use effect
  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await getProductDetails(ProductIdFromUrl);
        if (response.status) {
          console.log("Single product data: ", response.data);
          setDetails(response.data);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductDetails();
  }, [ProductIdFromUrl]); // Add ProductIdFromUrl as a dependency

  const url = `http://localhost:1008`;

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Product Details
      </h1>

      {/* Image Gallery Section */}
      <div className="flex justify-center gap-4 flex-wrap">
        {details && details.images && details.images.length > 0 ? (
          details.images.slice(0, 6).map((element, index) => (
            <div
              key={index}
              className="w-[150px] h-[150px] bg-yellow-200 rounded-lg overflow-hidden"
            >
              <img
                src={`${url}/${element}`}
                alt="Product"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ))
        ) : (
          <p className="text-center text-red-500">No images available</p>
        )}
      </div>

      {/* Product Info Section */}
      <div className="mt-6 space-y-4">
        <h1 className="text-lg font-medium">
          Category:{" "}
          <span className="text-gray-600">{details?.ProductCategory}</span>
        </h1>
        <h1 className="text-lg font-medium">
          Name: <span className="text-gray-600">{details?.Name}</span>
        </h1>

        {/* Like Button */}
        {/* calling like product component - giving props from parent to child*/}

        {/* <LikeProduct userProductDetails={{ user_details, details }} /> */}

        <h1 className="text-lg font-medium">
          Country of Origin:{" "}
          <span className="text-gray-600">{details?.CountryOfOrigin}</span>
        </h1>

        <h1 className="text-lg font-medium">
          Price:
          <span className="text-green-600 font-semibold">
            {" "}
            ₹{details?.Price}
          </span>
        </h1>

        <h1 className="text-lg font-medium">
          Discount:
          <span className="text-blue-600">{details?.Discount}%</span>
        </h1>

        <h1 className="text-lg font-medium">
          Material Type:{" "}
          <span className="text-gray-600">{details?.MaterialType}</span>
        </h1>

        <h1 className="text-lg font-medium">
          Rating:
          <span className="text-yellow-500">{details?.Rating} ★</span>
        </h1>

        <h1 className="text-lg font-medium">
          Size: <span className="text-gray-600">{details?.SizeOfProduct}</span>
        </h1>

        {/* About Product */}
        <div className="text-lg font-medium">
          About Item:
          <p className="text-gray-600 mt-1">{details?.AboutItem}</p>
        </div>
      </div>
      {/* submit button */}
      <div className="flex justify-center">
        <AddToCart className="text-center" />
      </div>
    </div>
  );
}

// AboutItem: "A ring is a timeless piece of jewelry that carries profound symbolism and aesthetic appeal. Traditionally crafted from metals such as gold, silver, or platinum, and often adorned with gemstones or intricate designs, rings are worn for various reasons, from celebrating milestones and commitments to showcasing personal style. ";

// ProductId: "Ring-1726304534267";
// Rating: 3.5;
// SizeOfProduct: 10;
// StockAvailable: 10;
