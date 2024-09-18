import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  // fetching from app.js
  const userProfile = props.userData;
  // console.log(userProfile.FullName);

  const Navigate = useNavigate();

  return (
    <div className="bg-black w-[500px] h-[500px] justify-center align-center text-white">
      {/* User Profile - name, email,PhoneNumber, Address,  */}

      <container className="w-[80px] h-[80px] justify-center  align-left">
        <h1>Personal Information</h1>
        <div>
          <label htmlFor="">Full Name</label>
          <h1>{userProfile !== null && userProfile.FullName}</h1>
          <label htmlFor="">Email</label>
          <h1>{userProfile !== null && userProfile.Email}</h1>
          <label htmlFor="">Phone Number</label>
          <h1>{userProfile !== null && userProfile.PhoneNumber}</h1>
          <label htmlFor="">Location</label>
          <label htmlFor="">Pin Code</label>
          <label htmlFor="">Default Address</label>
          <h1>{userProfile !== null && userProfile.Address}</h1>
        </div>
      </container>
      <br />
      <h1
        className="cursor-pointer"
        onClick={() => {
          Navigate("/EditProfile");
        }}
      >
        Edit Profile
      </h1>
      <h1>Order History</h1>
      <h1>Wishlist</h1>
      <h1>Cart - add address input</h1>

      <h1>Contact Support</h1>
    </div>
  );
}
