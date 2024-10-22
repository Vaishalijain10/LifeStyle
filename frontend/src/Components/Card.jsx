import * as React from "react";
import { useNavigate } from "react-router-dom";
// import LikeProduct from "./LikeProduct";
import AddToCart from "./AddToCart";
import { useSelector } from "react-redux";
import { baseUrl } from "./functions/urls";

export default function Card(props) {
  const navigate = useNavigate();

  const details = props.given.element;
  console.log("details img: " + details);

  const user_details = useSelector((state) => state.user);
  console.log("user details on  card: " + user_details);

  const url = `${baseUrl}/`;
  console.log("url image: " + url + details.images[0]);

  return (
    <div className="min-w-[200px] max-w-[250px] h-[350px] bg-black rounded-lg border-2 border-gray-300 cursor-pointer shadow-lg overflow-hidden hover:border hover:border-black">
      {/* Image Section */}
      <div
        className="p-1 bg-white rounded-t-lg flex justify-center overflow-hidden cursor-pointer"
        onClick={() => navigate(`/ProductDetails/${details._id}`)}
      >
        <img
          src={url + details.images[0]}
          alt={details.Name}
          className="w-full h-[190px] object-cover rounded-md shadow-md border border-gray-200"
        />
      </div>

      {/* Content Section */}
      <div className="bg-white p-2 h-auto flex flex-col justify-between">
        {/* Title and Like Button */}
        <div className="flex justify-between items-center mb-1">
          <h1
            className="text-[16px] font-semibold font-mono truncate hover:text-[17px] hover:text-blue-950"
            onClick={() => navigate(`/ProductDetails/${details._id}`)}
          >
            {details.Name}
          </h1>

          {/* calling like product component - giving props from parent to child*/}
          {/* <LikeProduct userProductDetails={{ user_details, details }} /> */}
        </div>

        {/* Price and Discount */}
        <div className="flex justify-between mb-1">
          <h1 className="text-[16px] text-green-700 font-semibold">
            ₹{(100 - details.Discount) * 0.01 * details.Price}
          </h1>
          <h1 className="text-[12px] text-green-700 font-semibold">
            Discount - {details.Discount}%
          </h1>
        </div>

        <div className="flex justify-between mb-1">
          {/* Material Type */}
          <h1 className="text-[12px] font-semibold font-mono text-red-500 mb-2">
            {details.MaterialType}
          </h1>
          {/* Country of Origin */}
          <h1 className="text-[12px] font-semibold font-mono bg-[#FFBE98] text-black px-3 py-1 rounded-full mb-1 w-10 text-center">
            {details.CountryOfOrigin}
          </h1>
        </div>

        {/* Submit Button */}
        <AddToCart />
      </div>
    </div>
  );
}
