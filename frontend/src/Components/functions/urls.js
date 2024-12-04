

// Dynamically set the base URL based on the environment
const isLocalhost = window.location.hostname === "localhost";

export const baseUrl = isLocalhost
  ? "http://localhost:1008" // Local backend
  : process.env.REACT_APP_BASE_URL; // Deployed backend


// routes from app.js
export const userUrl = `${baseUrl}/users`;
export const productUrl = `${baseUrl}/products`;

export const productActionUrl = `${baseUrl}/product-action`;
