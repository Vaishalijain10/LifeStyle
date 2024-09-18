import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductDetails } from "../Api/Basic";
import { FcLike } from "react-icons/fc";
import { IoMdHeartEmpty } from "react-icons/io";

export default function ProductDetails() {
  // get id of the card clicked to fetch the details from the db

  // Use useSearchParams hook to get URL parameters
  const location = useLocation();
  // console.log("location : ", location);
  const ProductIdFromUrl = location.pathname.slice(16);
  // console.log(ProductIdFromUrl);

  // use state ->
  const [details, setDetails] = useState({});

  const [IsLiked, setIsLiked] = React.useState(false);

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
    <div>
      <h1>Product Details</h1>
      {/* slider  */}
      <div className="bg-black h-[500px] w-[500px] mr-[20px] ml-[20px]">
        <div id="image" className="p-3 bg-yellow-200 rounded-[30px]">
          {/* details and details !== null are same thing (syntax-wise) */}
          {details && details.images && details.images.length > 0 ? (
            details.images.map((element, index) => (
              <img src={`${url}/${element}`} key={index} alt="oops!!" />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>

      <h1>{details.ProductCategory}</h1>
      <h1>{details.Name}</h1>
      <div>
        <h1 className="bg-white mr-[6px] mt-[3px]">
          {!IsLiked && (
            <IoMdHeartEmpty
              onClick={() => {
                setIsLiked(true);
              }}
            />
          )}
          {IsLiked && <FcLike />}
        </h1>
      </div>
      <h1>{details.CountryOfOrigin}</h1>
      <h1>{details.Price}</h1>
      <h1>{details.Discount}</h1>
      <h1>{details.MaterialType}</h1>
      <h1>{details.Rating}</h1>
      <h1>{details.SizeOfProduct}</h1>
      <h1>{details.AboutItem}</h1>
    </div>
  );
}

// AboutItem: "A ring is a timeless piece of jewelry that carries profound symbolism and aesthetic appeal. Traditionally crafted from metals such as gold, silver, or platinum, and often adorned with gemstones or intricate designs, rings are worn for various reasons, from celebrating milestones and commitments to showcasing personal style. ";

// ProductId: "Ring-1726304534267";
// Rating: 3.5;
// SizeOfProduct: 10;
// StockAvailable: 10;
