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

function App() {
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
