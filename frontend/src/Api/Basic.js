// axios -> help in giving and take
import axios from "axios";

const url = "http://localhost:1008/users";
const url1 = "http://localhost:1008/products";

export const RegisterUser = async (FormData) => {
  console.log("Reached register in basic.js -> frontend api");
  const response = await axios.post(url + "/register", FormData);
  return response.data;
};

// exporting in line 6

export const LoginUser = async (FormData) => {
  console.log("Reached login  in basic.js -> frontend api");
  const response = await axios.post(url + "/login", FormData);
  return response.data;
};

// fetching card details
export const getDetailsInCard = async () => {
  console.log("Fetching card details!");
  const response = await axios.get(url1 + "/fetchProducts");
  return response.data;
};

// fetching product details
export const getProductDetails = async (ProductIdFromUrl) => {
  console.log("Fetching individual product details");
  const response = await axios.get(
    `${url1}/ProductDetails/${ProductIdFromUrl}`
  );
  return response.data;
};
