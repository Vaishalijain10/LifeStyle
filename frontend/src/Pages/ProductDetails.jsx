import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductDetails } from "../Api/Basic";

export default function ProductDetails() {
  // get id of the card clicked to fetch the details from the db

  // Use useSearchParams hook to get URL parameters
  const location = useLocation();
  // console.log("location : ", location);
  const ProductIdFromUrl = location.pathname.slice(16);
  // console.log(ProductIdFromUrl);

  // use state ->
  const [details, setDetails] = useState({});

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

  return (
    <div>
      <h1>Product Details</h1>
      <h1>{details.ProductCategory}</h1>
    </div>
  );
}
