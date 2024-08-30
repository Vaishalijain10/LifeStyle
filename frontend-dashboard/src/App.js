// route setup

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// importing pages!
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./Style/app.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";

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
              <Route path="/Login" element={<Login />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/AddProducts" element={<AddProducts />} />
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
