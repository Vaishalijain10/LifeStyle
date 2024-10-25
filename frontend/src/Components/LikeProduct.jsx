import React from "react";
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { productActionUrl } from "./functions/urls";
import { fetchRecords } from "../redux/slices/productAction";

export default function LikeProduct(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("Like Product : user : ", user);
  // records are product action
  const records = useSelector((state) => state.productAction.records);
  console.log("Like Product : (records)productAction : ", records);

  // user.loggedIn &&  user.WishList array -> display -> red heart in card
  async function handleEmptyHeart() {
    console.log("handle Empty Heart");
    if (!user.loggedIn) {
      toast.error("You are not logged In!");
      return;
    }
    await axios
      .post(`${productActionUrl}/add-record-action`, {
        ProductId: props.productId,
        UserId: user.userData._id,
        ActionType: "Like",
      })
      .then((res) => res.data)
      .then((res) => {
        if (res.status) {
          dispatch(fetchRecords(user.userData._id));
          toast.success("Product added to wishlist!");
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }

  async function handleFilledHeart() {
    console.log("handle Filled Heart");
    if (!user.loggedIn) {
      toast.error("You are not logged in!");
      return;
    }
    await axios
      .delete(`${productActionUrl}/remove-record-action`, {
        data: {
          ProductId: props.productId,
          UserId: user.userData._id,
          ActionType: "RemoveLike",
        },
      })
      .then((res) => res.data)
      .then((res) => {
        if (res.status) {
          dispatch(fetchRecords(user.userData._id)); // Refresh the wishlist records
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
          {records.find(
            (element) =>
              element.UserId === user.userData._id &&
              element.ProductId === props.productId
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

// loggedIn ->
// T - check -> wishlist already exit - Red heart  -> click -> "are you sure you want to remove?" -> yes -> delete : no -> remain as it is
//              not exist -> read heart + wishlist add

//  F - redirect to login + toast
