import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
export default function Notifications() {
  const user = useSelector((state) => state.user);
  if (!user.loggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col justify-center  h-full bg-[#ddf22312]">
      <h1 className="text-center">
        Wow! No new <span className="font-bold font-serif">Notification</span>
      </h1>
      <div className="flex justify-center">
        <IoNotificationsOutline className="text-[200px] " />
      </div>
    </div>
  );
}
