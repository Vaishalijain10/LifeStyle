import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productUrl } from "../Components/functions/urls";
import { toast } from "react-toastify";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom"; // For navigation
import DefaultImage from "../images/HashTag.jpeg";
import { MdDelete } from "react-icons/md";
import { addToRecord, removeFromRecord } from "../redux/slices/productAction";

export default function AddToCartPage() {
  const user = useSelector((state) => state.user);
  // user details
  console.log("Add to cart : user : ", user);
  const records = useSelector((state) => state.productAction.records);

  // records - actionType, userId, ProductId
  console.log("Add to cart : records : ", records);
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate(); // Navigation hook
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchcartProducts() {
      const cartProductIds = records
        .filter((record) => record.ActionType === "AddToCart")
        .map((record) => ({
          ProductId: record.ProductId,
          Quantity: record.Quantity,
        }));
      console.log("cart product ids : " + cartProductIds);
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
    (agg, product) =>
      agg +
      product.Quantity *
        (product.Price - product.Price * product.Discount * 0.01),
    0
  );

  // Delivery charge logic
  const deliveryCharge = subtotal < 3000 ? 3 * 5 : 0; // Assuming 5km for now
  const finalTotal = subtotal + deliveryCharge;

  const handleDelete = (product) => {
    const recordToDelete = records.find(
      (record) =>
        record.ProductId === product.ProductId &&
        record.ActionType === "AddToCart"
    );
    console.log("handle delete : ", recordToDelete);
    if (recordToDelete) {
      setSelectedProduct(recordToDelete);
    } else {
      toast.error("Unable to find the product in records");
    }
  };

  // Confirm remove from cart
  const confirmRemoveFromCart = async () => {
    if (!selectedProduct) {
      toast.error("No product selected");
      return;
    }

    console.log("Dispatching removeFromRecord with: ", selectedProduct._id);
    console.log("selected product  ", selectedProduct);
    dispatch(removeFromRecord(selectedProduct._id))
      .then((result) => {
        if (result.payload.data.status) {
          toast.success("Product removed from cart!");
        } else {
          toast.error("Failed to remove product from cart");
        }
      })
      .catch((error) => {
        console.error("Error removing product:", error);
        toast.error("An error occurred while removing the product");
      });
    setSelectedProduct(null);
  };

  // Confirm add to wishlist & remove from cart
  const confirmAddToWishListandRemoveFromCart = async () => {
    if (!selectedProduct) {
      return;
    }
    // Check if the product is already in the wishlist
    const isAlreadyInWishlist = records.find(
      (record) =>
        record.ProductId === selectedProduct.ProductId &&
        record.ActionType === "Like"
    );

    if (isAlreadyInWishlist) {
      // If already in the wishlist, just remove it from the cart and dont add another record in wishlist
      dispatch(removeFromRecord(selectedProduct._id))
        .then((result) => {
          if (result.payload.data.status) {
            toast.success("Product already in wishlist. Removed from cart!");
          } else {
            toast.error("Failed to remove product from cart");
          }
        })
        .catch((error) => {
          console.error("Error removing product:", error);
          toast.error("An error occurred while removing the product");
        });
    } else {
      // If not in the wishlist, add it to the wishlist and remove from the cart
      dispatch(
        addToRecord({
          ProductId: selectedProduct.ProductId,
          UserId: user.userData?._id,
          ActionType: "Like",
        })
      );

      dispatch(removeFromRecord(selectedProduct._id)) // Use the correct _id
        .then((result) => {
          if (result.payload.data.status) {
            toast.success("Product removed from cart and added to wishlist!");
          } else {
            toast.error(
              "Failed to remove product from cart and add to wishlist"
            );
          }
        })
        .catch((error) => {
          console.error("Error removing product:", error);
          toast.error("An error occurred while removing the product");
        });
    }

    setSelectedProduct(null);
  };

  return (
    <div className="m-4 bg-gray-100 shadow-sm shadow-gray-400">
      <h1 className="text-2xl font-bold mt-2 mb-2 text-center text-black uppercase tracking-widest">
        Your Shopping Cart
      </h1>

      {/* If there are cart products, show them */}
      {cartProducts.length > 0 ? (
        <div className="w-full px-2 md:w-[80%] mx-auto">
          {/* Subtotal Section */}
          <div className="flex w-full border-2 border-[#AD825C] rounded-md mx-auto p-2 mb-2">
            <h2 className="font-bold text-lg">
              Subtotal: <span className="text-[#AD825C] "> ₹</span>{" "}
              {subtotal.toFixed(2)}
            </h2>
            {deliveryCharge > 0 && (
              <p className="text-sm text-gray-600 ml-auto text-end mt-[0.20rem]">
                Delivery Charge (3₹ per km & 5km distance):{" "}
                <span className="text-[#AD825C]"> ₹</span> {deliveryCharge}
              </p>
            )}
          </div>

          {/* Scrollable Cart Items */}
          <div className="overflow-auto max-h-[308px] border border-gray-300 rounded-md p-2 bg-white shadow-md scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cartProducts.map((product, index) => (
                <div
                  key={index}
                  className="border p-6 rounded-lg shadow-lg flex flex-col items-center bg-white hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <img
                    src={product.ProductImages[0] || DefaultImage}
                    alt={product.Name}
                    className="w-full h-40 object-cover mb-4 border-gray-200 rounded-lg p-1 border-[1px]"
                  />
                  <h2 className="font-semibold text-xl mb-2 text-center">
                    {product.Name}
                  </h2>
                  <div className="flex justify-between w-full items-center">
                    <p className="text-sm text-gray-600">
                      Quantity: {product.Quantity}
                    </p>
                    <p className="text-xl font-bold text-black">
                      ₹
                      {product.Quantity *
                        (
                          product.Price -
                          product.Price * product.Discount * 0.01
                        ).toFixed(2)}
                    </p>
                    <div
                      className="text-2xl hover:text-red-700 cursor-pointer"
                      onClick={() => handleDelete(product)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Section */}
          <div className="w-full border-2 border-[#AD825C] rounded-md mx-auto p-2 mt-2 mb-2">
            <h2 className="font-bold text-lg">
              Final Total: <span className="text-[#AD825C] "> ₹</span>{" "}
              {finalTotal.toFixed(2)}
            </h2>
          </div>

          {/* Checkout Button */}
          <div className="mt-4 pb-4 flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="bg-[#AD825C] text-white py-3 px-8 rounded-full hover:bg-[#AD825C] transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        // Empty cart display
        <div className="flex w-full h-[65vh] justify-center items-center">
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

      {/* Confirmation Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-md shadow-lg p-6 w-[550px]">
            <h2 className="text-lg font-bold mb-4">
              What would you like to do with "
              {selectedProduct.ProductId.split("-")[0]}"?
            </h2>
            <div className="flex justify-between gap-2">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={confirmRemoveFromCart}
              >
                Remove from Cart
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={confirmAddToWishListandRemoveFromCart}
              >
                Remove & Add to Wishlist
              </button>
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400"
                onClick={() => setSelectedProduct(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
