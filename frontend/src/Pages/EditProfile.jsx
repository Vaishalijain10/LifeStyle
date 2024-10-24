import React, {  useState } from "react";
import { EditUserProfile } from "../Api/Basic";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUser } from "../redux/slices/userSlice";

export default function EditProfile() {
  // fetching userData from app.js
  const UserProfile = useSelector((state) => state.user);
  console.log("edit profile : UserProfile : ", UserProfile);

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  // State for user profile (initialize with empty fields to avoid null errors)
  const [userProfile, setUserProfile] = useState({
    FullName: UserProfile.userData?.FullName,
    Email: UserProfile.userData?.Email,
    PhoneNumber: UserProfile.userData?.PhoneNumber,
    Address: UserProfile.userData?.Address,
  });
  var { FullName, Email, PhoneNumber, Address } = userProfile;

  // Handle input change in form fields
  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  }

  // Form submission handler
  async function handleProfileEdit(event) {
    event.preventDefault();
    console.log("edit profile : trycatch-userProfile : ", userProfile);
    // Show confirmation dialog before proceeding
    const confirmSave = window.confirm(
      "Are you sure you want to save changes?"
    );
    if (!confirmSave) {
      // If the user clicks "Cancel", exit the function and don't save the changes
      return;
    }
    try {
      // Send updated user profile to the server
      const data = await EditUserProfile(userProfile);
      if (data.status) {
        dispatch(fetchUser());
        console.log("Profile updated successfully", data);
        toast.success("Profile updated successfully");
        Navigate("/Profile");
      } else {
        console.error("Failed to update profile", data.message);
        toast.error(data.message);
      }
      // Optionally, you can handle UI feedback here, like showing a success message.
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile");
    }
  }

  // If userProfile is empty, display a loading message
  if (!UserProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background-image pb-[2.78%] pt-[2.78%] h-full overflow-y-hidden no-scrollbar">
      <div className="container w-[50%] m-auto border-2 border-white bg-[#AD825C]">
        <h1 className="text-3xl text-gray-950 text-center mb-[20px] mt-[30px] px-10 text-[#ffff] font-semibold">
          Edit Profile!
        </h1>
        <div className="form-transparent">
          <form className="px-20" onSubmit={handleProfileEdit}>
            {/* Name */}
            <input
              placeholder="Full Name"
              name="FullName"
              value={FullName}
              type="text"
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              onChange={handleInputChange}
              required
            />
            {/* Email */}
            <input
              placeholder="Email"
              name="Email"
              value={Email}
              type="email"
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              onChange={handleInputChange}
              required
            />
            {/* Phone Number */}
            <input
              placeholder="Phone Number"
              name="PhoneNumber"
              value={PhoneNumber}
              type="number"
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              onChange={handleInputChange}
              minLength={10}
              required
            />
            {/* Address */}
            <input
              placeholder="Address"
              name="Address"
              value={Address}
              type="text"
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              onChange={handleInputChange}
              required
            />

            {/* Submit Button */}
            <button
              className="w-full mb-[30px] bg-[#74512D] text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-[#78614a] transition duration-150 ease-in-out hover:shadow-lg active:bg-[#543310]"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
