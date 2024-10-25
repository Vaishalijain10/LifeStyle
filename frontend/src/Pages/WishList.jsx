import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Components/Card"; // Ensure this path is correct
import { fetchRecords } from "../redux/slices/productAction"; // Redux action to fetch records

export default function Wishlist() {
  const dispatch = useDispatch();
  const user_details = useSelector((state) => state.user);
  const productAction = useSelector((state) => state.productAction);

  // Fetch records on component mount
  useEffect(() => {
    if (user_details.userData?._id) {
      dispatch(fetchRecords(user_details.userData._id));
    }
  }, [user_details.userData?._id, dispatch]);

  // Filter liked products
  const likedProducts = productAction.records.filter(
    (record) => record.ActionType === "Like"
  );

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Your Wishlist</h1>
      {likedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {likedProducts.map((record) => (
            <Card key={record.ProductId} given={{ element: record }} />
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-700">
          Your wishlist is currently empty.
        </p>
      )}
    </div>
  );
}
