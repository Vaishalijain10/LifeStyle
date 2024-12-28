import React, { useState } from "react";
import { AddProduct } from "../Api/Basic";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

function AddProducts() {
  const Navigate = useNavigate();

  // sending data in the backend -> using states and hooks
  const [loading, setLoading] = useState(false);

  // initial state for staticData -> Keeps track of the product information
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
    ProductImages: [],
  });

  // Destructure form data for convenience
  const {
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
    ProductImages,
  } = staticData;

  // Handles input change for text inputs and dropdowns
  function HandleChange(event) {
    SetStaticData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    // max image - 6
    if (files.length > 6) {
      alert("You can only upload a maximum of 6 images.");
      return;
    }
    setLoading(true);
    try {
      const imageUrls = [];
      // upload each image in cloudinary - uploadImage function
      for (const file of files) {
        const imageUrl = await uploadImage(file);
        imageUrls.push(imageUrl);
      }

      SetStaticData((prev) => ({
        ...prev,
        ProductImages: [...prev.ProductImages, ...imageUrls],
      }));
      console.log(staticData);
      alert("All images uploaded successfully!");
    } catch (error) {
      alert("Failed to upload one or more images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // cloud function
  const uploadImage = async (file) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "LifeStyle");
      data.append("cloud_name", "vaishalijain");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/vaishalijain/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      return result.url;
    } catch (error) {
      throw new Error("Image upload failed");
    }
  };

  // Form submit handler
  async function HandleSubmit(event) {
    event.preventDefault();

    const ProductId = ProductCategory + "-" + Date.now();
    const formData = new FormData();

    // Append all staticData fields to the FormData
    Object.keys(staticData).forEach((key) => {
      if (key === "ProductImages") {
        staticData.ProductImages.forEach((imageUrl, index) => {
          formData.append(`ProductImages[${index}]`, imageUrl);
        });
      } else {
        formData.append(key, staticData[key]);
      }
    });

    formData.append("ProductId", ProductId);

    try {
      const response = await AddProduct(formData);
      if (response.status) {
        alert("Product added successfully!");
        Navigate("/Products");
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert("Unable to add product. Report!");
      console.log("handle submit error: ", error);
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
              type="text"
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Stock available  */}
            <input
              placeholder="Stock Available  "
              name="StockAvailable"
              value={StockAvailable}
              onChange={HandleChange}
              type="number"
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Rating  */}
            <input
              placeholder="Rating"
              name="Rating"
              value={Rating}
              onChange={HandleChange}
              type="number"
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Price */}
            <input
              placeholder="Price"
              name="Price"
              value={Price}
              onChange={HandleChange}
              type="number"
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Discount if available */}
            <input
              placeholder="Discount"
              name="Discount"
              value={Discount}
              onChange={HandleChange}
              type="number"
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Material Type */}
            <input
              placeholder="Material Type"
              name="MaterialType"
              value={MaterialType}
              onChange={HandleChange}
              type="text"
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/*Size Of Product */}
            <input
              placeholder="Size Of Product"
              name="SizeOfProduct"
              value={SizeOfProduct}
              onChange={HandleChange}
              type="number"
              className="h-[35px] w-full mb-3 px-4 py-1 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Country of Origin */}
            <input
              placeholder="Country of Origin"
              name="CountryOfOrigin"
              value={CountryOfOrigin}
              onChange={HandleChange}
              type="text"
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
                htmlFor="ProductImages"
                className="text-white px-3 text-[12px]"
              >
                Choose Images (Max 6)
              </label>
              <input
                className="w-full px-2 py-2 mb-3 text-[20px] text-gray-700 bg-white border-gray-300 rounded transition ease-in-out "
                type="file"
                id="ProductImages"
                name="ProductImages"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
              {ProductImages &&
                ProductImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product ${index + 1}`}
                    width="100"
                  />
                ))}
            </div>

            {/* Submit button */}
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
