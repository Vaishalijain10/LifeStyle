import React from "react";
import { FcLike } from "react-icons/fc";
import { IoMdHeartEmpty } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LikeProduct(props) {
  const navigate = useNavigate();

  const details = props.userProductDetails.details;
  console.log("details img: " + details);

  const user_details = props.userProductDetails.user_details;
  console.log("user details on  card: " + user_details);

  //   const [IsLiked, setIsLiked] = React.useState(false);
  //
  const [contain, setContain] = React.useState(
    user_details != null && user_details.WishList.includes(details._id)
  );

  return (
    <div>
      {user_details == null && (
        <IoMdHeartEmpty
          onClick={() => {
            navigate("/Login");
          }}
        />
      )}
      {user_details && !contain ? (
        <IoMdHeartEmpty
          className="text-red-500 cursor-pointer hover:text-red-600"
          onClick={() => {
            // algo -> click - logged in or no
            if (user_details) {
              // req to backend
              axios
                .post("http://localhost:1008/users/add-to-wishlist", {
                  userId: user_details._id,
                  productId: details._id,
                })
                .then((Response) => {
                  if (Response.data.status) {
                    alert("Product is added to Wish-List");
                    console.log("Product is added to Wish-List");
                    setContain(true);
                  } else {
                    alert("Something went wrong while adding to wish-list!");
                    console.log(
                      "Something went wrong while adding to wish-list!"
                    );
                  }
                })
                .catch((error) => {
                  console.log(error);
                  alert("DataBase error - connectivity");
                });
            } else {
              navigate("/Login");
            }
          }}
        />
      ) : (
        <FcLike
          className="text-red-500"
          onClick={() => {
            const result = window.confirm(
              "Are you sure you want to remove product from wish-list?"
            );
            if (result) {
              axios
                .post("http://localhost:1008/users//remove-from-wishlist", {
                  userId: user_details._id,
                  productId: details._id,
                })
                .then((Response) => {
                  if (Response.data.status) {
                    console.log("Removed Successfully from your wish list");
                    alert("Removed Successfully from your wish list");
                    setContain(false);
                  } else {
                    console.log("Something went wrong in the wishList");
                    alert("Something went wrong in the wishList");
                  }
                })
                .catch((error) => {
                  console.log(error);
                  alert("DataBase error - Connectivity");
                });
            }
            // req to backend
          }}
        />
      )}
    </div>
  );
}
