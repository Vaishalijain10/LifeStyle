import React from "react";
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { productActionUrl } from "./functions/urls";
import { addToRecord, fetchRecords } from "../redux/slices/productAction";

export default function LikeProduct(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // records are product action
  const records = useSelector((state) => state.productAction.records);

  // user.loggedIn &&  user.WishList array -> display -> red heart in card
  async function handleEmptyHeart() {
    console.log("handle Empty Heart");
    if (!user.loggedIn) {
      toast.error("You are not logged In!");
      return;
    }
    dispatch(
      addToRecord({
        ProductId: props.productId,
        UserId: user.userData?._id,
        ActionType: "Like",
      })
    );
  }

  //  remove like
  async function handleFilledHeart() {
    console.log("handle Filled Heart");
    if (!user.loggedIn) {
      toast.error("You are not logged in!");
      return;
    }
    await axios
      .post(`${productActionUrl}/remove-record-action`, {
        ProductId: props.productId,
        UserId: user.userData._id,
        ActionType: "Like",
      })
      .then((res) => res.data)
      .then((res) => {
        if (res.status) {
          dispatch(fetchRecords(user.userData._id));
          toast.success("Product removed from wishlist!");
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
    <>
      {user.loggedIn ? (
        <>
          {records.length > 0 &&
          records.find(
            (element) =>
              element.UserId === user.userData._id &&
              element.ProductId === props.productId &&
              element.ActionType === "Like"
          ) !== undefined ? (
            <FcLike onClick={handleFilledHeart} />
          ) : (
            <CiHeart onClick={handleEmptyHeart} />
          )}
        </>
      ) : (
        <CiHeart />
      )}
    </>
  );
}
