import React, { useState } from "react";
import "../Style/NavBar.css";
// importing images and storing it in img variable
import img from "../images/logo-new.jpeg";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteAuth } from "../redux/slices/userSlice";
import Search from "./Search";
import TotalInCart from "./TotalInCart";
import { IoNotifications } from "react-icons/io5";

export default function NavBar() {
  const Navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const [active, setActive] = useState("/");

  const handleNavigate = (path) => {
    setActive(path); // Set the active path
    Navigate(path); // Navigate to the new path
  };

  return (
    <div className="bg-[#AD825C] sticky top-0 z-50 shadow-sm shadow-slate-400 px-4 py-2">
      {/* For large screens (lg and above) */}
      <div className="hidden md:grid md:grid-cols-3 items-center">
        {/* LogoName Section */}
        <div className="flex items-center gap-4">
          <img
            src={img}
            alt="logo"
            className="w-14 h-14 rounded-full cursor-pointer"
          />
          <h1 className="hidden md:block text-white font-semibold text-2xl">
            LifeStyle!
          </h1>
        </div>

        {/* UserName and Search Box Section */}
        <div className="flex flex-col items-center justify-center gap-2">
          {user.loggedIn && pathname === "/" && (
            <>
              <h1 className="text-center text-white font-semibold text-lg">
                {user.userData.FullName}
              </h1>
              <Search className="w-full" />
            </>
          )}
        </div>

        {/* Icons Section */}
        <div className="flex justify-end items-center gap-6">
          <ul className="flex items-center gap-4 text-white text-3xl">
            <li
              className={`${
                active === "/" ? "text-amber-950" : ""
              } hover:text-amber-950 transition`}
              onClick={() => handleNavigate("/")}
            >
              <FaHome />
            </li>
            {user.loggedIn ? (
              <>
                <li
                  className={`${
                    active === "/WishList" ? "text-amber-950 text-2xl" : ""
                  } hover:text-amber-950 transition`}
                  onClick={() => handleNavigate("/WishList")}
                >
                  <div className="relative">
                    <MdFavorite />
                    <TotalInCart
                      countFor="Like"
                      className="absolute bottom-6 left-5 text-[12px] text-white rounded-full bg-amber-950 w-6 h-6 pl-2 "
                    />
                  </div>
                </li>
                <li
                  className={`${
                    active === "/AddToCart" ? "text-amber-950 text-2xl" : ""
                  } hover:text-amber-950 transition`}
                  onClick={() => handleNavigate("/AddToCartPage")}
                >
                  <div className="relative">
                    <FaShoppingCart />
                    <TotalInCart
                      countFor="AddToCart"
                      className="absolute bottom-6 left-5  text-[12px] text-white rounded-full bg-amber-950 w-6 h-6 pl-2 "
                    />
                  </div>
                </li>
                <li
                  className={`${
                    active === "/notifications" ? "text-amber-950 text-2xl" : ""
                  } hover:text-amber-950 transition`}
                  onClick={() => handleNavigate("/notifications")}
                >
                  <IoNotifications />
                </li>
                <li
                  className={`${
                    active === "/Profile" ? "text-amber-950 text-2xl" : ""
                  } hover:text-amber-950 transition`}
                  onClick={() => handleNavigate("/Profile")}
                >
                  <MdManageAccounts />
                </li>
                <li
                  className="hover:text-amber-950 transition"
                  onClick={() => {
                    localStorage.removeItem("Token");
                    dispatch(deleteAuth());
                    handleNavigate("/login");
                  }}
                >
                  <IoMdLogOut />
                </li>
              </>
            ) : (
              <li
                className="hover:text-amber-950 transition"
                onClick={() => handleNavigate("/login")}
              >
                <IoMdLogIn />
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* For smaller screens (md and below) */}
      <div className="md:hidden grid gap-4">
        {/* First row: LogoName and User/Search */}
        <div className="flex justify-between items-center">
          {/* LogoName Section */}
          <div className="flex items-center gap-4">
            <img
              src={img}
              alt="logo"
              className="w-12 h-12 rounded-full cursor-pointer"
            />
            <h1 className="hidden sm:block text-white font-semibold text-xl">
              LifeStyle!
            </h1>
          </div>

          {/* UserName and Search Box Section */}
          <div className="flex flex-col items-center">
            {user.loggedIn && (
              <h1 className="text-center text-white font-semibold text-sm">
                {user.userData.FullName}
              </h1>
            )}
            {pathname === "/" && <Search className="w-full md:w-[50%]" />}
          </div>
        </div>

        {/* Second row: Icons */}
        <div className="flex justify-around items-center text-white text-3xl">
          <ul className="flex gap-6 text-3xl">
            <li
              className={`${
                active === "/" ? "text-amber-950 " : ""
              } hover:text-amber-950 transition`}
              onClick={() => handleNavigate("/")}
            >
              <FaHome />
            </li>
            {user.loggedIn ? (
              <>
                <li
                  className={`${
                    active === "/WishList" ? "text-amber-950" : ""
                  } hover:text-amber-950 transition`}
                  onClick={() => handleNavigate("/WishList")}
                >
                  <MdFavorite />
                </li>
                <li
                  className={`${
                    active === "/AddToCartPage" ? "text-amber-950 " : ""
                  } hover:text-amber-950 transition`}
                  onClick={() => handleNavigate("/AddToCartPage")}
                >
                  <FaShoppingCart />
                </li>
                <li
                  className={`${
                    active === "/notifications" ? "text-amber-950 " : ""
                  } hover:text-amber-950 transition`}
                  onClick={() => handleNavigate("/notifications")}
                >
                  <IoNotifications />
                </li>
                <li
                  className={`${
                    active === "/Profile" ? "text-amber-950 " : ""
                  } hover:text-amber-950 transition`}
                  onClick={() => handleNavigate("/Profile")}
                >
                  <MdManageAccounts />
                </li>
              </>
            ) : (
              <li
                className="hover:text-amber-950 transition"
                onClick={() => handleNavigate("/login")}
              >
                <IoMdLogIn />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
