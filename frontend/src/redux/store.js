import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productActionReducer from "./slices/productAction"
export const store = configureStore({
  reducer: {
    user: userReducer,
    productAction : productActionReducer,
  },
});
