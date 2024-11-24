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
  // Function to handle navigation and set active state
  const handleNavigate = (path) => {
    setActive(path); // Set the active path
    Navigate(path); // Navigate to the new path
  };

  return (
    // Login/register || Links -> #AD825C
    <div className=" bg-[#AD825C] grid grid-cols-1 md:grid-cols-3  py-1 shadow-sm shadow-slate-400 pt-2 pb-2 sticky top-0 z-50 px-4">
      <div className=" text-[#FFFFFF] cursor-pointer flex  gap-5 transition-colors ">
        {/* logo */}

        <img
          src={img}
          alt="logo"
          className="w-16 h-16 rounded-full"
          width={20}
          height={20}
        />

        {/*LifeStyle name */}
        <h1 className="font-semibold text-2xl mt-[12px] hover:text-[30px] hover:text-amber-950 ease-in-out duration-200 invisible md:visible">
          LifeStyle!
        </h1>
      </div>
      {/* Username */}
      <div className="flex flex-col justify-center">
        {user.loggedIn && (
          <h1 className="text-[15px] font-semibold text-white text-center ">
            {user.userData.FullName}
          </h1>
        )}

        {pathname === "/" && (
          <Search className="flex-shrink-0 flex justify-center " />
        )}
      </div>

      <div className="NavBar-Links text-[#FFFFFF] flex justify-end w-full cursor-pointer absolute  md:relative top-0">
        <ul className="NavBar-ul flex justify-center gap-8 font-semibold mt-[15px] uppercase">
          {/* home */}
          <li
            className={`NavBar-li text-[25px] ${
              active === "/"
                ? "text-amber-950 text-[30px] ease-in-out duration-200"
                : ""
            } hover:text-[30px] hover:text-amber-950 ease-in-out duration-200`}
            onClick={() => handleNavigate("/")}
          >
            <FaHome />
          </li>

          {/* logged in */}
          {user.loggedIn ? (
            <>
              {/* wish List */}
              <li
                className={`NavBar-li text-[25px] ${
                  active === "/WishList"
                    ? "text-amber-950 text-[30px] ease-in-out duration-200"
                    : ""
                } hover:text-[30px] hover:text-amber-950 ease-in-out duration-200`}
                onClick={() => handleNavigate("/WishList")}
              >
                <div className="relative">
                  <MdFavorite />
                  <TotalInCart
                    countFor="Like"
                    className="absolute text-[15px] bottom-4 left-4 text-white hover:text-red-400 rounded-full bg-amber-950 w-6 pl-2  "
                  />
                </div>
              </li>
              <li
                className={`NavBar-li text-[25px] ${
                  active === "/AddToCart"
                    ? "text-amber-950 text-[30px] ease-in-out duration-200"
                    : ""
                } hover:text-[30px] hover:text-amber-950 ease-in-out duration-200`}
                onClick={() => handleNavigate("/AddToCartPage")}
              >
                <div className="relative ">
                  <FaShoppingCart />
                  <TotalInCart
                    countFor="AddToCart"
                    className="absolute text-[15px] bottom-4 left-4 text-white hover:text-red-400 rounded-full bg-amber-950 w-6 pl-2  "
                  />
                </div>
              </li>

              <li
                className={`NavBar-li text-[25px] ${
                  active === "/Profile"
                    ? "text-amber-950 text-[30px] ease-in-out duration-200"
                    : ""
                } hover:text-[30px] hover:text-amber-950 ease-in-out duration-200`}
                onClick={() => handleNavigate("/Profile")}
              >
                <MdManageAccounts />
              </li>
              <li
                className={`NavBar-li text-[25px] ${
                  active === "/notifications"
                    ? "text-amber-950 text-[30px] ease-in-out duration-200"
                    : ""
                } hover:text-[30px] hover:text-amber-950 ease-in-out duration-200`}
                onClick={() => handleNavigate("/notifications")}
              >
                <IoNotifications />
              </li>

              {/* in logout section -> local storage -> null -> setLoggedIn-> value changes  */}
              <li
                className={`NavBar-li text-[25px] ${
                  active === "/login"
                    ? "text-amber-950 text-[30px] ease-in-out duration-200"
                    : ""
                } hover:text-[30px] hover:text-amber-950 ease-in-out duration-200`}
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
            // log In
            <li
              className={`NavBar-li text-[25px] ${
                active === "/login"
                  ? "text-amber-950 text-[30px] ease-in-out duration-200"
                  : ""
              } hover:text-[30px] hover:text-amber-950 ease-in-out duration-200`}
              onClick={() => handleNavigate("/login")}
            >
              <IoMdLogIn />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
