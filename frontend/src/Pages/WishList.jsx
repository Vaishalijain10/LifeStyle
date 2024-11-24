import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Components/Card";
import { fetchRecords } from "../redux/slices/productAction";
import axios from "axios";
import { productUrl } from "../Components/functions/urls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GiBrokenHeartZone } from "react-icons/gi";
export default function Wishlist() {
  const dispatch = useDispatch();
  const user_details = useSelector((state) => state.user);
  const productAction = useSelector((state) => state.productAction);
  const [Products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch records on component mount
  useEffect(() => {
    if (user_details.loggedIn) {
      dispatch(fetchRecords(user_details.userData._id));
    }
  }, [dispatch, user_details.loggedIn, user_details.userData]);

  // Watch for updates to productAction records and fetch product details
  useEffect(() => {
    const likedProducts = productAction.records.filter(
      (record) => record.ActionType === "Like"
    );

    async function LikedProductDetails() {
      const array = likedProducts.map((record) => record.ProductId);
      await axios
        .post(`${productUrl}/liked-product-details`, array)
        .then((response) => response.data)
        .then((res) => {
          if (res.status) {
            setProducts(res.data);
          } else {
            console.error("Error fetching liked product details:", res.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error(error.message);
        });
    }
    if (likedProducts.length > 0) {
      LikedProductDetails();
    } else {
      setProducts([]);
    }
  }, [productAction.records]);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mt-4 mb-6 text-center text-black uppercase tracking-widest">
        Your Wishlist
      </h1>

      {Products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Products.map((element, index) => (
            <Card given={element} key={index} />
          ))}
        </div>
      ) : (
        // Empty Wishlist display
        <div className="flex w-full h-[60vh] justify-center items-center">
          <div className="text-center">
            {/* Centered Heart Icon for Wishlist */}
            <GiBrokenHeartZone className="text-[150px] text-gray-400 mx-auto" />
            {/* <TiHeartBroken className="text-[150px] text-gray-400 mx-auto" /> */}
            <h2 className="text-xl text-gray-700 mt-4">
              Oops! Your wishlist is empty.
            </h2>
            <p className="text-gray-500 mt-2">
              Looks like you haven't added any products to your wishlist yet.
            </p>
            <button
              onClick={() => navigate("/")} // Redirect to home page
              className="mt-4 text-white bg-blue-500 py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
