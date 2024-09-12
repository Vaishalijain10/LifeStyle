import React, { useState } from "react";
import { AddProduct } from "../Api/Basic";
import { useNavigate } from "react-router-dom";

function AddProducts() {
  const Navigate = useNavigate();
  // sending data in the backend -> using states and hooks
  // initial state -> Initially setting variables names as empty which will be further given input by user and send it to backend.
  // value in input field = form data field
  const [files, setFiles] = useState([]);
  // dummy data base!!
  const [staticData, SetStaticData] = useState({
    Admin: "Vaishali",
    ProductCategory: "Shoes",
    Name: "Black High Heels",
    StockAvailable: 10,
    Rating: 3.5,
    Price: 1000,
    Discount: 10,
    MaterialType: "Acrylic",
    SizeOfProduct: "10",
    CountryOfOrigin: "USA",
    AboutItem:
      "Pure Black shiny high heels made of USA based ACRYLIC material eye-catching comforting heels, Party wear and amazing looks",
  });

  // assigning values to form data -> input made by user is save in the form data.
  var {
    Admin,
    ProductCategory,
    Name,
    StockAvailable,
    Rating,
    Price,
    Discount,
    MaterialType,
    SizeOfProduct,
    CountryOfOrigin,
    AboutItem,
  } = staticData;

  // dropdown Product Category
  function HandleChange(event) {
    // console.log(event.target.value);
    SetStaticData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  // onClick event activated
  // AddProduct is equal to the basic.js in frontend dashboard
  async function HandleSubmit(event) {
    event.preventDefault();
    // testing  form data
    // const FormData = { name: "Product", id: 3 };
    if (files.length < 1) {
      return alert("Must Pick at least 1 picture");
    } else if (files.length > 6) {
      return alert(
        "You can pick at most 6 images. Subscribe Premium for more images"
      );
    } else {
      console.log("Something Something!");
    }
    const ProductId = ProductCategory + "-" + Date.now();
    const formData = new FormData();

    files.forEach((ele, index) => {
      // modified file name
      formData.append("files", ele, `${ProductId}-${index}.jpg`);
    });
    Object.keys(staticData).forEach((key) => {
      formData.append(key, staticData[key]);
    });

    formData.append("ProductId", ProductId);
    console.log(formData);

    try {
      const response = await AddProduct(formData);
      console.log(response);
      if (response.status) {
        alert("Product added Successfully!");
        Navigate("/Products");
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert("A technical error occurred. We are sorry. Report");
      console.log("handle submit error :", error);
    }
  }

  return (
    <div className="background-image pl-[10%] md:pl-30% h-full pt-10">
      <div className="w-[50%] md:w-[500px] border-2 border-white rounded-md ">
        <h1 className="text-xl text-center mb-1 text-black font-semibold bg-white">
          Add Product
        </h1>

        <div className="form-transparent">
          <form
            onSubmit={HandleSubmit}
            className="overflow-y-scroll h-[700px] pr-2"
          >
            {/* Admin */}
            <select
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              name="Admin"
              value={Admin}
              id="Admin"
              onChange={HandleChange}
            >
              <option value="" disabled className="text-gray-700">
                Admin
              </option>
              <option value="Vaishali">Vaishali</option>
              <option value="Devansh">Devansh</option>
            </select>

            {/* Category Dropdown  */}
            <select
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              name="ProductCategory"
              value={ProductCategory}
              id="ProductCategory"
              onChange={HandleChange}
            >
              <option value="" disabled className="text-gray-700">
                Product Category
              </option>
              <option value="Shoes">Shoes</option>
              <option value="Bangles">Bangles</option>
              <option value="Belt">Belt</option>
              <option value="Earrings">Earrings</option>
              <option value="Handbags">Handbags</option>
              <option value="Ring">Ring</option>
              <option value="Scarves">Scarves</option>
              <option value="Wallets">Wallets</option>
              <option value="Watches">Watches</option>
            </select>

            {/* Name  */}
            <input
              placeholder="Name"
              name="Name"
              value={Name}
              onChange={HandleChange}
              type="String"
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Stock available  */}
            <input
              placeholder="Stock Available  "
              name="StockAvailable"
              value={StockAvailable}
              onChange={HandleChange}
              type="Number"
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Rating  */}
            <input
              placeholder="Rating"
              name="Rating"
              value={Rating}
              onChange={HandleChange}
              type="Number"
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />
            {/* // Price -> // discount if available // Net Quantity // Material
              type // size // Country of Origin // About the item */}

            {/* Price */}
            <input
              placeholder="Price"
              name="Price"
              value={Price}
              onChange={HandleChange}
              type="Number"
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Discount if available */}
            <input
              placeholder="Discount"
              name="Discount"
              value={Discount}
              onChange={HandleChange}
              type="Number"
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Material Type */}
            <input
              placeholder="Material Type"
              name="MaterialType"
              value={MaterialType}
              onChange={HandleChange}
              type="String"
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/*Size Of Product */}
            <input
              placeholder="Size Of Product"
              name="SizeOfProduct"
              value={SizeOfProduct}
              onChange={HandleChange}
              type="Number"
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Country of Origin */}
            <input
              placeholder="Country of Origin"
              name="CountryOfOrigin"
              value={CountryOfOrigin}
              onChange={HandleChange}
              type="String"
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* About the item */}
            <textarea
              placeholder="About the item"
              name="AboutItem"
              value={AboutItem}
              onChange={HandleChange}
              type="text"
              className="h-[150px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* image */}
            <div className="image-upload">
              <label
                htmlFor="image-upload"
                className="text-white px-3 text-[12px]"
              >
                Choose Images (Max 6)
              </label>
              <input
                className="w-full px-2 py-2 mb-3 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out "
                type="file"
                id="ProductImages"
                name="ProductImages"
                multiple="6"
                accept="image/*"
                onChange={(event) => {
                  setFiles(Array.from(event.target.files));
                }}
              />
            </div>

            {/* button */}
            <button
              className="w-full mb-[30px] bg-[rgb(46,166,175)] text-white px-7 py-3 text-sm font-semibold uppercase rounded hover:bg-[rgb(218,68,248)]"
              type="submit"
              id="submitProduct"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>

    // Add to Cart
    // buy now
  );
}

export default AddProducts;
