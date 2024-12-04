import React, { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import {
  addToRecord,
  handleQuantity,
  removeFromRecord,
} from "../redux/slices/productAction";

export default function AddToCart(props) {
  const user = useSelector((state) => state.user);
  // console.log(`Add to cart btn : `, user);
  const records = useSelector((state) => state.productAction.records);
  // console.log(`Add to cart btn : `, records);
  const [refresh, setRefresh] = useState(true);
  const dispatch = useDispatch();

  async function CartBtnToWindow() {
    if (!user.loggedIn) {
      toast.warn(`Login before add products to cart`);
      return;
    }
    dispatch(
      addToRecord({
        ProductId: props.productId,
        UserId: user.userData?._id,
        ActionType: "AddToCart",
      })
    );
  }
  useEffect(() => {}, [refresh]);

  return (
    // add to cart button to activate add to cart window
    <div className=" w-full mb-[30px] bg-black text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-gray-950 transition duration-150 ease-in-out hover:shadow-lg active:bg-gray-900">
      <div className="flex flex-row gap-3 justify-center">
        {Array(
          records.find(
            (record) =>
              record.ProductId === props.productId &&
              record.UserId === user.userData?._id &&
              record.ActionType === "AddToCart"
          )
        )?.map((record, index) => {
          return (
            <div key={index}>
              {record !== undefined ? (
                <div className="flex gap-9">
                  <h1
                    onClick={() => {
                      if (record.Quantity === 1) {
                        dispatch(removeFromRecord(record._id));
                        setRefresh(false);
                        return;
                      }
                      dispatch(
                        handleQuantity({
                          id: record._id,
                          Quantity: record.Quantity - 1,
                        })
                      );
                    }}
                    className="text-[27px] hover:bg-slate-600 transition ease-in-out"
                  >
                    -
                  </h1>
                  <h1 className="text-[25px] text-white"> {record.Quantity}</h1>
                  <h1
                    onClick={() =>
                      dispatch(
                        handleQuantity({
                          id: record._id,
                          Quantity: record.Quantity + 1,
                        })
                      )
                    }
                    className="text-[23px] hover:bg-slate-600 transition ease-in-out"
                  >
                    +
                  </h1>
                </div>
              ) : (
                <div
                  className="flex gap-3 hover:text-red-500"
                  onClick={CartBtnToWindow}
                >
                  <TiShoppingCart className="text-[25px] " />
                  <h1 type="submit" className="justify-center text-[12px]">
                    Add To Cart
                  </h1>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// className = "flex flex-row";
