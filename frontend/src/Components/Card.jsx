import * as React from "react";
import { useNavigate } from "react-router-dom";
import AddToCart from "./AddToCart";
// import { baseUrl } from "./functions/urls";
import LikeProduct from "./LikeProduct";
import DefaultImage from "../images/HashTag.jpeg";
export default function Card(props) {
  const navigate = useNavigate();
  // product detail
  const details = props.given.element;

  // Ensure details.images is defined and is an array
  const ProductImageUrl = details.ProductImages[0] || `${DefaultImage}`;

  // console.log(imageUrl);

  return (
    <div
      style={{ boxShadow: "0 3px 10px #52515133" }}
      className=" w-[250px] h-[350px] bg-[#AD825C] rounded-sm border-2 border-gray-300 cursor-pointer shadow-lg overflow-hidden hover:border hover:border-[#AD825C] "
    >
      {/* Image Section */}
      <div
        className=" bg-white rounded-sm flex justify-center overflow-hidden cursor-pointer"
        onClick={() => navigate(`/ProductDetails/${details._id}`)}
      >
        <img
          src={ProductImageUrl}
          alt={details.Name}
          className="w-full h-[190px] object-cover rounded-sm shadow-md border border-gray-200"
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

          {/* wishlist */}
          <LikeProduct productId={details.ProductId} />
        </div>

        {/* Price and Discount */}
        <div className="flex justify-between mb-1">
          <h1 className="text-[16px] text-green-700 font-semibold">
            ₹
            {(details.Price - details.Price * details.Discount * 0.01).toFixed(
              2
            )}
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
          <h1 className="text-[12px] font-semibold font-mono bg-[#FFBE98] text-black px-3 py-1 rounded-full mb-1 text-center">
            {details.CountryOfOrigin}
          </h1>
        </div>

        {/* Submit Button */}
        <AddToCart productId={details.ProductId} />
      </div>
    </div>
  );
}
