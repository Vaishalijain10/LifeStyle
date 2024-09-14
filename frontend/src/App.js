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

function App() {
  // setting up route in frontend
  const IsLoggedIn = localStorage.getItem(("Token") !== "");
  const [user, setUser] = useState(null);
  // creating pipeline (streams) -> modern syntax
  useEffect(() => {
    if (localStorage.getItem("Token") !== undefined) {
      setUser(null);
    } else {
      console.log(user);
      // url -> send response -> user is valid or not
      axios
        .post(
          "http://localhost:1008/users/auth-profile",
          localStorage.getItem("Token")
        )
        .then((response) => response.json())
        .then((data) => setUser(data)) // Update user state with API data
        .catch((error) =>
          console.error(
            "Error fetching user data in app.js(frontend):",
            error,
            user
          )
        );
    }
  }, [IsLoggedIn]); // null dependency-array to run only once

  return (
    <>
      <div className="App">
        {/* Router handles all routes within route */}
        {/* there is only 1 routes and handle many route */}

        <Router>
          {/* NavBar Component */}
          <NavBar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/BestChoice" element={<BestChoice />} />
              <Route path="/WishList" element={<WishList />} />
              <Route path="/MyOrders" element={<MyOrders />} />
              <Route path="/Cart" element={<Cart />} />
              <Route
                path="/ProductDetails/:Product_id"
                element={<ProductDetails />}
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
