import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductDetails } from "../Api/Basic";
import AddToCart from "../Components/AddToCart";
import { baseUrl } from "../Components/functions/urls";
import { IoArrowBackCircle } from "react-icons/io5";
export default function ProductDetails() {
  // get id of the card clicked to fetch the details from the db

  // Use useSearchParams hook to get URL parameters
  const location = useLocation();
  // console.log("location : ", location);
  const ProductIdFromUrl = location.pathname.slice(16);
  // console.log(ProductIdFromUrl);

  // use state -> its for product details
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
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

  // base url from functions
  const url = baseUrl;

  return (
    <div className="m-5 pt-5 pl-5 pr-5 bg-gray-100 rounded-lg shadow-md max-w-6xl mx-auto overflow-auto max-h-[508px] ">
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <IoArrowBackCircle
          className="text-3xl cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h1 className="flex-1 text-2xl font-semibold text-center">
          Product Details
        </h1>
      </div>

      {/* Flex container for images and details */}
      <div className="flex justify-center gap-12 items-center">
        {/* Left section: Product Images */}
        <div className="flex flex-wrap justify-center gap-4 w-1/3">
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

        {/* Right section: Product Details */}
        <div className="w-2/3 space-y-3">
          <h1 className="text-lg font-medium">
            Category:{" "}
            <span className="text-gray-600">{details?.ProductCategory}</span>
          </h1>
          <h1 className="text-lg font-medium">
            Name: <span className="text-gray-600">{details?.Name}</span>
          </h1>

          <h1 className="text-lg font-medium">
            Country of Origin:{" "}
            <span className="text-gray-600">{details?.CountryOfOrigin}</span>
          </h1>

          <h1 className="text-lg font-medium">
            Price:{" "}
            <span className="text-green-600 font-semibold">
              {" "}
              ₹{details?.Price}
            </span>
          </h1>

          <h1 className="text-lg font-medium">
            Discount:{" "}
            <span className="text-blue-600">{details?.Discount}%</span>
          </h1>

          <h1 className="text-lg font-medium">
            Material Type:{" "}
            <span className="text-gray-600">{details?.MaterialType}</span>
          </h1>

          <h1 className="text-lg font-medium">
            Rating: <span className="text-yellow-500">{details?.Rating} ★</span>
          </h1>

          <h1 className="text-lg font-medium">
            Size:{" "}
            <span className="text-gray-600">{details?.SizeOfProduct}</span>
          </h1>

          <div className="text-lg font-medium">
            About Item:
            <p className="text-gray-600 mt-1">{details?.AboutItem}</p>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="flex justify-center mt-4 w-[50%] ml-[20%]  cursor-pointer">
        <AddToCart productId={details.ProductId} className="text-center " />
      </div>
    </div>
  );
}
