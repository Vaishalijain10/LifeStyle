// axios -> help in giving and take
import axios from "axios";
import { productUrl, userUrl } from "../Components/functions/urls";


export const RegisterUser = async (FormData) => {
  console.log("Reached register in basic.js -> frontend api");
  const response = await axios.post(`${userUrl}/register`, FormData);
  return response.data;
};

// edit user profile
export const EditUserProfile = async (userProfile) => {
  console.log("Reached edit profile in basic.js -> frontend api");
    const response = await axios.put(`${userUrl}/edit-profile`, userProfile);
    console.log("frontend : basic.js : edit user profile : ", response);
    return response.data;
};

// exporting in line 6

export const LoginUser = async (FormData) => {
  console.log("Reached login  in basic.js -> frontend api");
  const response = await axios.post(`${userUrl}/login`, FormData);
  console.log(response.data);
  return response.data;
};

// fetching card details
export const getDetailsInCard = async () => {
  console.log("Fetching card details!");
  const response = await axios.get(`${productUrl}/fetchProducts`);
  return response.data;
};

// fetching product details
export const getProductDetails = async (ProductIdFromUrl) => {
  console.log("Fetching individual product details");
  const response = await axios.get(
    `${productUrl}/ProductDetails/${ProductIdFromUrl}`
  );
  return response.data;
};

// Fetching wishlist products
export const getWishlistProducts = async (productIds) => {
  console.log("Fetching wishlist products!");
  try {
    const response = await axios.post(`${productUrl}/WishList`, { productIds });
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist products:", error);
    throw error;
  }
};
