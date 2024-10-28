// like production, buy product, add to cart, order history
// delete, view edit product in dashBoard

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { productActionUrl } from "../../Components/functions/urls";

// return promise -> liked product
export const fetchRecords = createAsyncThunk("fetchRecords", async (userId) => {
  const response = await axios.get(
    `${productActionUrl}/get-all-records/${userId}`
  );
  console.log(`productAction slice : fetch Records:`, response.data);
  return response.data;
});

const productActionSlice = createSlice({
  name: "productAction",
  initialState: {
    records: [],
  },
  reducers: {
    
  },
  extraReducers: (builders) => {
    builders.addCase(fetchRecords.rejected, (state, action) => {
      console.log("productAction slice : record rejected");
    });
    builders.addCase(fetchRecords.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.records = action.payload.data;
      } else {
        console.log("productAction slice : status false");
      }
    });
  },
});


export default productActionSlice.reducer;