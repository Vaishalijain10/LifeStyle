import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// importing pages!
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import BestChoice from "./Pages/BestChoice";
import WishList from "./Pages/WishList";
import MyOrders from "./Pages/MyOrders";
import Cart from "./Pages/Cart";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import ForgotPassword from "./Pages/ForgotPassword";
import "./Style/app.css";
import ProductDetails from "./Pages/ProductDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound404 from "./Pages/NotFound404";
import EditProfile from "./Pages/EditProfile";

function App() {
  // setting up route in frontend
  const [IsLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("Token") !== null
  );

  const [user, setUser] = useState(null);

  // creating pipeline (streams) -> modern syntax
  useEffect(() => {
    if (IsLoggedIn) {
      console.log("User logged in!");
      // url -> send response -> user is valid or not
      axios
        .post("http://localhost:1008/users/auth-profile", {
          Token_id: localStorage.getItem("Token"),
        })
        .then((response) => response.data)
        .then((data) => {
          if (data.status) {
            setUser(data.userInfo);
            console.log("user details :", data.userInfo);
            console.log("user name :", data.userInfo.FullName);
          }
        }) // Update user state with API data
        .catch((error) =>
          console.error("Error fetching user data in app.js(frontend):", error)
        );
    } else {
      console.log("User not logged in!", user);
      setIsLoggedIn(false);
    }
  }, [IsLoggedIn]); // null dependency-array to run only once

  return (
    <>
      <div className="App">
        {/* Router handles all routes within route */}
        {/* there is only 1 routes and handle many route */}

        <Router>
          {/* NavBar Component */}
          {/*  userData={user} --> sending props */}
          <NavBar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home userData={user} />} />
              <Route
                path="/Register"
                element={IsLoggedIn ? <Home /> : <Register />}
              />
              <Route path="/Login" element={<Login userData={user} />} />
              <Route
                path="/ForgotPassword"
                element={IsLoggedIn ? <Home /> : <ForgotPassword />}
              />
              <Route path="/Profile" element={<Profile userData={user} />} />
              <Route path="/BestChoice" element={<BestChoice />} />
              <Route
                path="/WishList"
                element={IsLoggedIn ? <WishList /> : <Login />}
              />
              <Route
                path="/MyOrders"
                element={IsLoggedIn ? <MyOrders /> : <Login />}
              />
              <Route
                path="/Cart"
                element={IsLoggedIn ? <Cart userData={user} /> : <Login />}
              />

              <Route
                path="/ProductDetails/:Product_id"
                element={<ProductDetails />}
              />

              <Route path="/*" element={<NotFound404 />} />

              <Route
                path="/EditProfile"
                element={
                  IsLoggedIn ? <EditProfile userData={user} /> : <Login />
                }
              />
            </Routes>
          </div>
          {/* Footer Component */}
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
