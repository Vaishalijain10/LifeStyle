import React from "react";
import Card from "../Components/Card";
import { useSelector } from "react-redux";

export default function Wishlist() {
  // user data fetching from app.js -> object - WishList - {ProductId}
  const user_details = useSelector((state) => state.user);
  console.log("WishList : userdetails : ", user_details);

  // use effect to fetch product id from the backend in user model

  // mapping wishlist(product id) with product id from product model

  // matched product id will

  return (
    <div>
      <h1>WishList Item </h1>
      <Card getWishlistProducts={{ user_details }} />
    </div>
  );
}
