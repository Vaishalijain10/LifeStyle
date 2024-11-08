import axios from "axios";
import React from "react";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { productActionUrl } from "./functions/urls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchRecords, handleQuantity } from "../redux/slices/productAction";

export default function AddToCart(props) {
  const user = useSelector((state) => state.user);
  // console.log(`Add to cart btn : `, user);
  const records = useSelector((state) => state.productAction.records);
  // console.log(`Add to cart btn : `, records);



  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function CartBtnToWindow() {
    if (!user.loggedIn) {
      toast.warn(`Login before add products to cart`);
      return navigate("/Login");
    }
    await axios
      .post(`${productActionUrl}/add-record-action`, {
        UserId: user.userData._id,
        ProductId: props.productId,
        ActionType: "AddToCart",
      })
      .then((res) => res.data)
      .then((res) => {
        if (res.status) {
          toast.success(`Cart is added!`);
          dispatch(fetchRecords(user.userData._id));
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }

  
  

  return (
    // add to cart button to activate add to cart window
    <div className=" w-full mb-[30px] bg-black text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-gray-950 transition duration-150 ease-in-out hover:shadow-lg active:bg-gray-900">
      <div className="flex flex-row gap-3 justify-center">
        {/* logged user id == fetch user id from slice  */}
        {/* records - containser user's action detail */}
        {records.find(
          (record) =>
            record.ProductId === props.productId &&
            record.ActionType === "AddToCart"
        ) !== undefined ? (
          <div className="flex gap-9">
            <h1
              onClick={() => dispatch(handleQuantity({ sign: "+", id: _id }))}
              className="text-[23px] hover:bg-slate-600 transition ease-in-out"
            >
              +
            </h1>
            <h1 className="text-[25px]"> {1 || records.quantity}</h1>
            <h1
              onClick={() => dispatch(handleQuantity({ sign: "-", id: _id }))}
              className="text-[27px] hover:bg-slate-600 transition ease-in-out"
            >
              -
            </h1>
          </div>
        ) : (
          <>
            <div
              className="flex gap-3 hover:text-red-500"
              onClick={CartBtnToWindow}
            >
              <TiShoppingCart className="text-[25px] " />
              <h1 type="submit" className="justify-center">
                Add To Cart
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// className = "flex flex-row";
