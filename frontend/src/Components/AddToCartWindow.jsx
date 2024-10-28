import React from "react";

export default function AddToCartWindow() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Add to Cart</h2>
      <p>Your item has been added to the cart!</p>
      <button className="mt-3 p-2 bg-blue-600 text-white rounded">
        Continue Shopping!
      </button>
    </div>
  );
}
