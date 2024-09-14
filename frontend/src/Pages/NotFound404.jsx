import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound404(props) {
  const Navigate = useNavigate();

  if (props.userData) {
    Navigate("/");
  }

  return (
    <div>
      <h1 className="text-[200px] text-center">Page not found!</h1>
    </div>
  );
}
