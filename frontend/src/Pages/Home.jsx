import React from "react";

export default function Home() {
  // we use "useEffect" -> when any change occur in the browser.

  return (
    <div>
      <h1>Home</h1>
      {/* Condition rendering -> before login and after login */}
      {localStorage.getItem("Token") !== null &&
        localStorage.getItem("Token") !== "" &&
        `HELLO User! `}

      <h1>search box - left side and right side - wishlist</h1>
      <h1>carousel</h1>
      <h1>Best choice</h1>
      <h1>4 - cards - </h1>
      <h1>contact form - right and location - left</h1>
    </div>
  );
}
