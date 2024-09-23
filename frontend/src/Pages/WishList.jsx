import React from "react";
import Card from "../Components/Card";

export default function Wishlist(props) {
  // user data fetching from app.js -> object - WishList - {ProductId}
  const user_details = props.userData.Wishlist;
  console.log();

  // product details -> from card section

  return (
    <div>
      <h1>WishList Item </h1>
      <Card WishlistProduct={{ user_details }} />
    </div>
  );
}
