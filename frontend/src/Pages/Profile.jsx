import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  // fetching from app.js
  const userProfile = useSelector((state) => state.user);
  console.log("profile : userProfile : ", userProfile);

  const Navigate = useNavigate();

  return (
    <div className="background-image pb-[2.78%] pt-[2.78%] h-full ">
      <div className="bg-black w-[750px] h-[69vh] p-6 rounded-lg mx-auto overflow-y-auto text-white">
        {/* Buttons Section */}
        <div className="flex flex-row space-x-4 justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
            onClick={() => {
              Navigate("/EditProfile");
            }}
          >
            Edit Profile
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded cursor-pointer">
            Order History
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded cursor-pointer"
            onClick={() => {
              Navigate("/Wishlist");
            }}
          >
            Wishlist
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded cursor-pointer">
            Cart - Add Address Input
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded cursor-pointer">
            Contact Support
          </button>
        </div>

        {/* User Profile - name, email,PhoneNumber, Address */}
        <div className="text-center mb-2 mt-2">
          <h1 className="text-xl font-semibold mb-0">Personal Information</h1>
          <div className="text-left space-y-4">
            <div>
              <label className="block text-sm text-gray-400">Full Name</label>
              <input
                type="text"
                value={userProfile.userData?.FullName}
                className="w-full p-2 mt-1 text-gray-600 rounded border cursor-no-drop border-gray-300 focus:outline-none"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">Email</label>
              <input
                type="email"
                value={userProfile.userData?.Email}
                className="w-full p-2 mt-1 text-gray-600 rounded border cursor-no-drop border-gray-300 focus:outline-none "
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">
                Phone Number
              </label>
              <input
                type="tel"
                value={userProfile.userData?.PhoneNumber}
                className="w-full p-2 mt-1 text-gray-600 rounded border cursor-no-drop border-gray-300 focus:outline-none "
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">State</label>
              <input
                type="text"
                value={userProfile.userData?.Location}
                className="w-full p-2 mt-1 text-gray-600 rounded border cursor-no-drop border-gray-300 focus:outline-none "
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">City</label>
              <input
                type="text"
                value={userProfile.userData?.Location}
                className="w-full p-2 mt-1 text-gray-600 rounded border cursor-no-drop border-gray-300 focus:outline-none "
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">Pin Code</label>
              <input
                type="text"
                value={userProfile.userData?.PinCode}
                className="w-full p-2 mt-1 text-gray-600 rounded border cursor-no-drop border-gray-300 focus:outline-none "
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">
                Default Address
              </label>
              <input
                type="text"
                value={userProfile.userData?.Address}
                className="w-full p-2 mt-1 text-gray-600 rounded border cursor-no-drop border-gray-300 focus:outline-none "
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
