import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  // we use "useEffect" -> when any change occur in the browser.
  const navigate = useNavigate(props);
  return (
    <div>
      {props.login ? (
        <h1>Hello Admin How are you?</h1>
      ) : (
        <h1 className="bg-[#723682] text-center">
          Admin You are not logged in
        </h1>
      )}

      <div className="flex gap-[18%]">
        <button
          onClick={() => navigate("/Products")}
          className="w-[200px] md:w-[20%] mb-[30px] bg-[#568382] text-white px-6 py-2 text-sm font-medium uppercase rounded shadow-md hover:bg-amber-900 transition duration-150 ease-in-out hover:shadow-lg active:bg-amber-900 "
        >
          Explore Products
        </button>

        <button
          onClick={() => navigate("/Products")}
          className="w-[200px] md:w-[20%] mb-[30px] bg-[#568382] text-white px-6 py-2 text-sm font-medium uppercase rounded shadow-md hover:bg-amber-900 transition duration-150 ease-in-out hover:shadow-lg active:bg-amber-900 "
        >
          Users
        </button>
      </div>

      <br />
      {/* <h1>Notification </h1>
      <h1>create a product Listing</h1> 
      <h1>Edit a product</h1>
      <h1>delete a product</h1>
      <h1>filter in categories - ring, earrings</h1>
      <h1>search box - category </h1>
      <h1>register user in website </h1>
      <h1>number of sales - customer count</h1>
      <h1>accounts - which customer purchased what - </h1>
      <h1> total purchased</h1>
      <h1>Orders pending / completed </h1>
      <h1>logout </h1> */}
    </div>
  );
}
