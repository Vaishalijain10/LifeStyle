import * as React from "react";
import { FcLike } from "react-icons/fc";
import { IoMdHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { useNavigate } from "react-router-dom";

export default function MediaCard(props) {
  const navigate = useNavigate();
  const details = props.given;
  const url = `http://localhost:1008/${details.images[0]}`;

  const [IsLiked, setIsLiked] = React.useState(false);

  return (
    <div
      className="min-w-[200px] max-w-[250px] h-[350px] bg-violet-400 rounded-lg border-2 border-black cursor-pointer overflow-hidden"
      onClick={() => navigate(`/ProductDetails/${details._id}`)}
    >
      {/* Image Section */}
      <div className="p-2 bg-white rounded-t-lg flex justify-center overflow-hidden">
        <img
          src={url}
          alt={details.Name}
          className="w-full h-[220px] object-cover border-2 border-red-300"
        />
      </div>
      {/* Content Section */}
      <div className="bg-white p-3 h-[calc(100%-150px)] flex flex-col justify-between">
        {/* Title and Like Button */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-[16px] font-semibold font-mono truncate">
            {details.Name}
          </h1>
          <div>
            {!IsLiked ? (
              <IoMdHeartEmpty
                className="text-red-500 cursor-pointer"
                onClick={() => setIsLiked(true)}
              />
            ) : (
              <FcLike className="text-red-500" />
            )}
          </div>
        </div>

        {/* Country of Origin */}
        <h1 className="text-[12px] font-semibold font-mono bg-green-500 text-white px-2 py-1 rounded-full mb-2 w-10">
          {details.CountryOfOrigin}
        </h1>

        {/* Price and Discount */}
        <div className="flex justify-between mb-2">
          <h1 className="text-[16px] text-green-700 font-semibold">
            ₹{(100 - details.Discount) * 0.01 * details.Price}
          </h1>
          <h1 className="text-[12px] text-green-700 font-semibold">
            Discount {details.Discount}%
          </h1>
        </div>

        {/* Material Type */}
        <h1 className="text-[12px] font-semibold font-mono text-red-500 mb-2">
          {details.MaterialType}
        </h1>

        {/* About Item */}
        <p className="text-[12px] font-serif line-clamp-3">
          {details.AboutItem}
        </p>
      </div>
    </div>
  );
}
