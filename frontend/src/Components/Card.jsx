import * as React from "react";
import { FcLike } from "react-icons/fc";
import { IoMdHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function MediaCard(props) {
  const navigate = useNavigate();
  const details = props.given;
  const url = `http://localhost:1008/${details.images[0]}`;

  const [IsLiked, setIsLiked] = React.useState(false);

  return (
    <div
      className="min-w-[200px] max-w-[250px] h-[350px] bg-black rounded-lg border-2 border-gray-300 cursor-pointer shadow-lg overflow-hidden"
      onClick={() => navigate(`/ProductDetails/${details._id}`)}
    >
      {/* Image Section */}
      <div className="p-1 bg-white rounded-t-lg flex justify-center overflow-hidden">
        <img
          src={url}
          alt={details.Name}
          className="w-full h-[190px] object-cover rounded-md shadow-md border border-gray-200"
        />
      </div>

      {/* Content Section */}
      <div className="bg-white p-2 h-[calc(100%-150px)] flex flex-col justify-between">
        {/* Title and Like Button */}
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-[16px] font-semibold font-mono truncate">
            {details.Name}
          </h1>
          <div>
            {!IsLiked ? (
              <IoMdHeartEmpty
                className="text-red-500 cursor-pointer hover:text-red-600"
                onClick={() => setIsLiked(true)}
              />
            ) : (
              <FcLike className="text-red-500" />
            )}
          </div>
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

        {/* Material Type */}
        <div className="flex justify-between mb-1">
          <h1 className="text-[12px] font-semibold font-mono text-red-500 mb-2">
            {details.MaterialType}
          </h1>
          {/* Country of Origin */}
          <h1 className="text-[12px] font-semibold font-mono bg-[#FFBE98] text-black px-3 py-1 rounded-full mb-1 w-10 text-center">
            {details.CountryOfOrigin}
          </h1>
        </div>

        {/* About Item */}
        <p className="text-[12px] font-serif line-clamp-3 text-gray-600">
          {details.AboutItem}
        </p>
      </div>
    </div>
  );
}
