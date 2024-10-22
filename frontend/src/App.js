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
import NotFound404 from "./Pages/NotFound404";
import EditProfile from "./Pages/EditProfile";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/slices/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function App() {
  const Dispatch = useDispatch();
  useEffect(() => {
    // coming from userSlice
    Dispatch(fetchUser());
  }, []);
  return (
    <>
      <div className="App">
        {/* Router handles all routes within route */}
        {/* there is only 1 routes and handle many route */}

        <Router>
          {/* NavBar Component */}
          {/*  userData={user} --> sending props */}
          <NavBar />
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="content">
            <Routes>
              {/* home */}
              <Route path="/" element={<Home />} />
              {/* register */}
              <Route path="/Register" element={<Register />} />
              {/* login */}
              <Route path="/Login" element={<Login />} />
              {/* forgot password */}
              <Route
                path="/ForgotPassword"
                element={ <ForgotPassword />}
              />
              {/* profile */}
              <Route path="/Profile" element={<Profile />} />

              <Route path="/BestChoice" element={<BestChoice />} />

              <Route
                path="/WishList"
                element={ <WishList /> }
              />

              <Route
                path="/MyOrders"
                element={<MyOrders /> }
              />

              <Route path="/Cart" element={ <Cart /> } />

              <Route
                path="/ProductDetails/:Product_id"
                element={<ProductDetails />}
              />

              <Route path="/*" element={<NotFound404 />} />

              <Route
                path="/EditProfile"
                element={ <EditProfile /> }
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
