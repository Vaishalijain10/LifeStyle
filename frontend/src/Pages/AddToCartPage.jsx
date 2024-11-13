import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productUrl } from "../Components/functions/urls";
import { toast } from "react-toastify";
import { TiShoppingCart } from "react-icons/ti";
export default function AddToCartPage() {
  const user = useSelector((state) => state.user);
  const records = useSelector((state) => state.productAction.records);
  const [cartProducts, setCartProducts] = useState([]);

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
        if (response.data.status) {
          console.log(response.data);
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
  return (
    <div>
      <h1 className="pl-4">
        Hey{" "}
        {user.loggedIn ? (
          <span className="font-bold text-red-500">
            {user.userData.FullName.split(" ")[0]}
          </span>
        ) : (
          "user"
        )}
        , This is your cart. Have a look at your items.
      </h1>
      {cartProducts.length > 0 ? (
        <div className="w-full px-2 mt-[10px] md:w-[80%] mx-auto ">
          <div className="w-[80%] border-2 border-green-300 rounded-md mx-auto p-3">
            <h1 className="font-bold h">
              Subtotal : <span className="text-green-400">Rs</span>{" "}
              {cartProducts.reduce(
                (agg, product) => agg + product.Price * product.Quantity,
                0
              )}
            </h1>
          </div>
          <div id="products" className="flex gap-3">
            {cartProducts.map((product, index) => {
              return (
                <div key={index}>
                  <h1>{product.Name}</h1>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-[80%] mx-auto flex justify-center pt-[100px] ">
          <TiShoppingCart className="text-[200px]" />
          <h1 className="text-center">OOOpss Nothing to show</h1>
        </div>
      )}
    </div>
  );
}
