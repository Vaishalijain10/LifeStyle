import axios from "axios";

// products name is equal to name given in the backend in app.js
const url = "http://localhost:1008/products";

// AddProduct is equal to the endpoint created in the backend ProductRoutes.js
// creating url to  view in browser
// FormData is  equal to the AddProducts.jsx
export const AddProduct = async (FormData) => {
  console.log(
    "Reached Add product section in basic.js -> frontend dashboard api"
  );
  const ProductResponse = await axios.post(url + "/AddProduct", FormData);
  console.log("ProductResponse in Dashboard" + ProductResponse);
  return ProductResponse.data;
};
