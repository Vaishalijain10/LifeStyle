// like production, buy product, add to cart, order history
// delete, view edit product in dashBoard

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { productActionUrl } from "../../Components/functions/urls";
import { toast } from "react-toastify";

// fetch record
export const fetchRecords = createAsyncThunk("fetchRecords", async (userId) => {
  const response = await axios.get(
    `${productActionUrl}/get-all-records/${userId}`
  );
  return response.data;
});

// Add a new record
export const addToRecord = createAsyncThunk("addToRecord", async (record) => {
  const response = await axios.post(
    `${productActionUrl}/add-record-action`,
    record
  );
  return {
    status: response.data.status,
    message: response.data.message,
    data: response.data.data,
  };
});

// handle quantity
export const handleQuantity = createAsyncThunk(
  "handleQuantity",
  async (obj) => {
    const response = await axios.put(
      `${productActionUrl}/update-quantity`,
      obj
    );
    return {
      status: response.data.status,
      message: response.data.message,
      data: obj,
    };
  }
);

// remove from record
export const removeFromRecord = createAsyncThunk(
  "removeFromRecord",
  async (_id) => {
    const response = await axios.delete(
      `${productActionUrl}/remove-record-action/${_id}`
    );
    console.log("remove from record");
    return {
      data: response.data,
      _id: _id,
    };
  }
);

const productActionSlice = createSlice({
  name: "productAction",
  initialState: {
    records: [],
  },
  reducers: {},
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

    builders.addCase(addToRecord.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.records.push(action.payload.data);
      } else toast.error(action.payload.message);
    });

    builders.addCase(addToRecord.rejected, (error) => {
      toast.error(error.message);
    });

    builders.addCase(handleQuantity.rejected, (err) => {
      console.log(err);
    });

    builders.addCase(handleQuantity.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.records.find(
          (record) => record._id === action.payload.data.id
        ).Quantity = action.payload.data.Quantity;
      }
    });

    builders.addCase(removeFromRecord.fulfilled, (state, action) => {
      console.log(state.records.length);
      if (action.payload.data.status) {
        state.records.splice(
          state.records.findIndex((ele) => ele._id === action.payload._id),
          1
        );
      }
      console.log(state.records.length);
    });
  },
});

export default productActionSlice.reducer;
