import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { GiRingingBell } from "react-icons/gi";
export default function Notifications() {
  const user = useSelector((state) => state.user);
  if (!user.loggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col justify-center  h-full bg-[#ddf22312]">
      <h1 className="text-center">
        oops! No new <span className="font-bold font-serif">Notifications</span>
      </h1>
      <div className="flex justify-center">
        <GiRingingBell className="text-[200px] " />
      </div>
    </div>
  );
}
