import React, { useState } from "react";
import { AddProduct } from "../Api/Basic";
import { useNavigate } from "react-router-dom";

function AddProducts() {
  const Navigate = useNavigate();
  // sending data in the backend -> using states and hooks
  //  initial state -> Initially setting variables names as empty which will be further given input by user and send it to backend.
  // value in input field = form data field
  const [FormData, SetFormData] = useState({
    ProductCategory: "",
    ProductId: "",
    Name: "",
    StockAvailable: "",
    Rating: "",
    Price: "",
    Discount: "",
    NetQuantity: "",
    MaterialType: "",
    SizeOfProduct: "",
    CountryOfOrigin: "",
    AboutItem: "",
    images: {},
  });

  // assigning values to form data -> input made by user is save in the form data.
  const {
    ProductCategory,
    ProductId,
    Name,
    StockAvailable,
    Rating,
    Price,
    Discount,
    NetQuantity,
    MaterialType,
    SizeOfProduct,
    CountryOfOrigin,
    AboutItem,
    images,
  } = FormData;

  // function -> count the images uploaded
  function UploadProductImages(event) {
    console.log("Arrived here! ");
    const button = document.getElementById("ProductImages");
    if (button.files.length > 6) {
      console.log("");
      alert("image more than 6!");
    } else {
      document.getElementById("submitProduct").removeAttribute("disabled");
    }
  }

  // dropdown Product Category
  function HandleChange(event) {
    // console.log(event.target.value);
    SetFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  // onClick event activated
  // AddProduct is equal to the basic.js in frontend dashboard
  async function HandleSubmit(event) {
    event.preventDefault();
    // testing  form data
    // const FormData = { name: "Product", id: 3 };
    console.log(FormData);
    try {
      const ProductResponse = await AddProduct(FormData);
      if (ProductResponse.success) {
        alert("Product added Successfully!");
        Navigate("/Products");
      } else {
        alert("Product Id already Exists! " + ProductResponse.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="background-image bg-black pb-[5.43%] pt-[5.43%] h-full overflow-y-hidden no-scrollbar ">
        <div className="container w-[50%] m-auto border-2 border-white">
          <h1 className="text-3xl text-center mb-[20px] mt-[30px] px-10 text-black font-semibold ">
            Add a Product
          </h1>

          <div className="form-transparent">
            <form className=" px-20" action="">
              {/* Category Dropdown  */}
              <select
                className="w-full mb-3 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                name="ProductCategory"
                value={ProductCategory}
                id="ProductCategory"
                onChange={HandleChange}
              >
                <option value="" disabled className="text-gray-700">
                  Product Category
                </option>
                <option value="Anklet">Anklet</option>
                <option value="Bangles">Bangles</option>
                <option value="Belt">Belt</option>
                <option value="Bracelet">Bracelet</option>
                <option value="Brooches and pins">Brooches and pins</option>
                <option value="Earrings">Earrings</option>
                <option value="HairClips&Bands">Hair Clips & Bands</option>
                <option value="Handbags">Handbags</option>
                <option value="Hats">Hats</option>
                <option value="NeckPiece">Neck Piece</option>
                <option value="NoseRing">Nose Ring</option>
                <option value="Ring">Ring</option>
                <option value="Scarves">Scarves</option>
                <option value="Scrunchies">Scrunchies</option>
                <option value="ToeRing">Toe ring</option>
                <option value="Wallets">Wallets</option>
                <option value="Watches">Watches</option>
              </select>

              {/* Product Id  */}
              <input
                placeholder=" Product Id"
                name="ProductId"
                value={ProductId}
                onChange={HandleChange}
                type="String"
                className="w-full mb-3 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                required
              />

              {/* Name  */}
              <input
                placeholder="Name"
                name="Name"
                value={Name}
                onChange={HandleChange}
                type="String"
                className="w-full mb-3 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                required
              />

              {/* Stock available  */}
              <input
                placeholder="Stock Available  "
                name="StockAvailable"
                value={StockAvailable}
                onChange={HandleChange}
                type="Number"
                className="w-full mb-3 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                required
              />

              {/* Rating  */}
              <input
                placeholder="Rating"
                name="Rating"
                value={Rating}
                onChange={HandleChange}
                type="Number"
                className="w-full mb-3 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
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
                className="w-full mb-3 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                required
              />

              {/* Discount if available */}
              <input
                placeholder="Discount"
                name="Discount"
                value={Discount}
                onChange={HandleChange}
                type="Number"
                className="w-full mb-3 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                required
              />

              {/* Net Quantity */}
              <input
                placeholder="Net Quantity"
                name="NetQuantity"
                value={NetQuantity}
                onChange={HandleChange}
                type="Number"
                className="w-full mb-3 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                required
              />

              {/* Material Type */}
              <input
                placeholder="Material Type"
                name="MaterialType"
                value={MaterialType}
                onChange={HandleChange}
                type="String"
                className="w-full mb-3 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                required
              />

              {/*Size Of Product */}
              <input
                placeholder="Size Of Product"
                name="SizeOfProduct"
                value={SizeOfProduct}
                onChange={HandleChange}
                type="Number"
                className="w-full mb-3 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                required
              />

              {/* Country of Origin */}
              <input
                placeholder="Country of Origin"
                name="CountryOfOrigin"
                value={CountryOfOrigin}
                onChange={HandleChange}
                type="String"
                className="w-full mb-3 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                required
              />

              {/* About the item */}
              <textarea
                placeholder="About the item"
                name="AboutItem"
                value={AboutItem}
                onChange={HandleChange}
                type="text"
                className="w-full  px-4 py-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                required
              />

              {/* image */}
              <div className="image-upload">
                <label htmlFor="image-upload" className="text-white px-4 py-6">
                  Choose Images (Max 6)
                </label>
                <input
                  className="w-full mb-3 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out "
                  type="file"
                  id="ProductImages"
                  name="ProductImages"
                  multiple
                  accept="image/*"
                  max="6"
                  required
                />
                <output id="image-count"></output>
                <button
                  type="button"
                  className="bg-white text-amber-950 hover:bg-amber-900 transition duration-150 ease-in-out hover:shadow-lg active:bg-amber-900 "
                  value="SaveProduct"
                  onClick={UploadProductImages}
                >
                  Confirm Images
                </button>
              </div>

              {/* button */}
              <button
                className="w-full mb-[30px] bg-amber-950 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-amber-900 transition duration-150 ease-in-out hover:shadow-lg active:bg-amber-900 "
                type="Submit"
                disabled
                onClick={HandleSubmit}
                id="submitProduct"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    // Add to Cart
    // buy now
  );
}

export default AddProducts;
