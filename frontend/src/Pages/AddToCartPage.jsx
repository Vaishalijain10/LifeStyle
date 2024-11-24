import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productUrl } from "../Components/functions/urls";
import { toast } from "react-toastify";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom"; // For navigation

export default function AddToCartPage() {
  const user = useSelector((state) => state.user);
  // user details
  console.log("Add to cart : user : ", user);
  const records = useSelector((state) => state.productAction.records);
  // records - actionType, userId, ProductId
  console.log("Add to cart : records : ", records);
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    async function fetchcartProducts() {
      const cartProductIds = records
        .filter((record) => record.ActionType === "AddToCart")
        .map((record) => ({
          ProductId: record.ProductId,
          Quantity: record.Quantity,
        }));
      console.log(cartProductIds);
      try {
        const response = await axios.post(
          `${productUrl}/get-cart-products`,
          cartProductIds
        );
        console.log("Add to card : response : ", response);
        if (response.data.status) {
          setCartProducts(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("PIPELINE_ERROR");
      }
    }

    fetchcartProducts();
  }, [records]);

  // Calculate subtotal
  const subtotal = cartProducts.reduce(
    (agg, product) => agg + product.Price * product.Quantity,
    0
  );

  // Delivery charge logic
  const deliveryCharge = subtotal < 3000 ? 10 * 5 : 0; // Assuming 5km for now
  const finalTotal = subtotal + deliveryCharge;

  return (
    <div className="m-5">
      <h1 className="text-3xl font-bold mt-4 mb-6 text-center text-black uppercase tracking-widest">
        Your Shopping Cart
      </h1>

      {/* If there are cart products, show them */}
      {cartProducts.length > 0 ? (
        <div className="w-full px-2 md:w-[80%] mx-auto">
          {/* Subtotal Section */}
          <div className="w-full border-2 border-green-300 rounded-md mx-auto p-2 mb-4">
            <h2 className="font-bold text-lg">
              Subtotal: <span className="text-green-400">Rs</span> {subtotal}
            </h2>
            {deliveryCharge > 0 && (
              <p className="text-sm text-gray-600">
                Delivery Charge (10 Rs per km):{" "}
                <span className="text-green-400">Rs</span> {deliveryCharge}
              </p>
            )}
          </div>

          {/* Cart Items */}

          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cartProducts.map((product, index) => (
              <div
                key={index}
                className="border p-6 rounded-lg shadow-lg flex flex-col items-center bg-white hover:shadow-xl transition-shadow duration-300"
              >
                {/* Product Image */}
                <img
                  src={product.images[0]}
                  alt={product.Name}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h2 className="font-semibold text-xl mb-2 text-center">
                  {product.Name}
                </h2>
                <div className="flex justify-between w-full items-center">
                  <p className="text-sm text-gray-600">
                    Quantity: {product.Quantity}
                  </p>
                  <p className="text-xl font-bold text-black">
                    Rs {product.Price * product.Quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="w-full border-2 border-green-300 rounded-md mx-auto p-2 mt-4 mb-2">
            <h2 className="font-bold text-lg">
              Final Total: <span className="text-green-400">Rs</span>{" "}
              {finalTotal}
            </h2>
          </div>

          {/* Checkout Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-500 text-white py-3 px-8 rounded-full hover:bg-green-600 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
       
        // Empty cart display
        <div className="flex w-full h-[60vh] justify-center items-center">
          <div className="text-center">
            {/* Centered Shopping Cart Icon */}
            <TiShoppingCart className="text-[150px] text-gray-400 mx-auto" />
            <h2 className="text-xl text-gray-700 mt-4">
              Oops! Your cart is empty.
            </h2>
            <p className="text-gray-500 mt-2">
              Looks like you haven't added any products yet.
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
