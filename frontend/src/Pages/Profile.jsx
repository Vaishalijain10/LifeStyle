import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  // fetching from app.js
  const userProfile = useSelector((state) => state.user);
  console.log("profile : userProfile : ", userProfile);

  const Navigate = useNavigate();

  return (
    <div className="background-image pb-5 pt-5 h-full flex justify-center items-center">
    <div className="overflow-y-auto scrollbar-y-auto h-[70vh] bg-black w-full max-w-[90%] md:max-w-[800px] p-6 rounded-lg  text-white">
      {/* Buttons Section */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer text-sm md:text-base"
          onClick={() => {
            Navigate("/EditProfile");
          }}
        >
          Edit Profile
        </button>
        {/* <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded cursor-pointer text-sm md:text-base">
          Order History
        </button> */}
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded cursor-pointer text-sm md:text-base"
          onClick={() => {
            Navigate("/Wishlist");
          }}
        >
          Wishlist
        </button>
        {/* <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded cursor-pointer text-sm md:text-base">
          Cart - Add Address Input
        </button> */}
        <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded cursor-pointer text-sm md:text-base">
          Contact Support
        </button>
      </div>

      {/* User Profile - name, email, PhoneNumber, Address */}
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-4 sm:text-2xl lg:text-3xl">
          Personal Information
        </h1>
        <div className="text-left space-y-4">
          <div>
            <label className="block text-sm text-gray-400">Full Name</label>
            <input
              type="text"
              value={userProfile.userData?.FullName || "N/A"}
              className="w-full p-2 mt-1 text-gray-600 rounded border border-gray-300 bg-gray-100 focus:outline-none"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={userProfile.userData?.Email || "N/A"}
              className="w-full p-2 mt-1 text-gray-600 rounded border border-gray-300 bg-gray-100 focus:outline-none"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400">Phone Number</label>
            <input
              type="tel"
              value={userProfile.userData?.PhoneNumber || "N/A"}
              className="w-full p-2 mt-1 text-gray-600 rounded border border-gray-300 bg-gray-100 focus:outline-none"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400">State</label>
            <input
              type="text"
              value={userProfile.userData?.State || "N/A"}
              className="w-full p-2 mt-1 text-gray-600 rounded border border-gray-300 bg-gray-100 focus:outline-none"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400">City</label>
            <input
              type="text"
              value={userProfile.userData?.City || "N/A"}
              className="w-full p-2 mt-1 text-gray-600 rounded border border-gray-300 bg-gray-100 focus:outline-none"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400">Pin Code</label>
            <input
              type="text"
              value={userProfile.userData?.PinCode || "N/A"}
              className="w-full p-2 mt-1 text-gray-600 rounded border border-gray-300 bg-gray-100 focus:outline-none"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400">
              Default Address
            </label>
            <input
              type="text"
              value={userProfile.userData?.Address || "N/A"}
              className="w-full p-2 mt-1 text-gray-600 rounded border border-gray-300 bg-gray-100 focus:outline-none"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
