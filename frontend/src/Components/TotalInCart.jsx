import React from "react";
import { useSelector } from "react-redux";

export default function TotalInCart(props) {
  const user = useSelector((state) => state.user);
  const records = useSelector((state) => state.productAction.records);

  return (
    <span className={props.className}>
      {
        records.filter(
          (product) =>
            product.UserId === user.userData?._id &&
            product.ActionType === props.countFor
        ).length
      }
    </span>
  );
}
