// user information
// userData
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userUrl } from "../../Components/functions/urls";

// sending to app.js
export const fetchUser = createAsyncThunk("fetchUser", async () => {
  if (localStorage.getItem("Token") === null)
    return {
      status: false,
      userData: null,
    };
  const response = await axios.get(
    `${userUrl}/auth-profile/${localStorage.getItem("Token")}`
  );
  console.log(`user slice : fetch user:`, response);
  console.log(response.data);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    userData: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.loggedIn = true;
      state.userData = action.payload;
    },
    deleteAuth: (state) => {
      state.loggedIn = false;
      state.userData = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(fetchUser.fulfilled, (state, action) => {
      console.log("hello");
      if (action.payload.status) {
        state.loggedIn = action.payload.status;
        state.userData = action.payload.data;
      }
    });
    builders.addCase(fetchUser.rejected, (state, action) => {
      console.log(state.loggedIn, action);
    });
  },
});

export const { setAuth, deleteAuth } = userSlice.actions;

export default userSlice.reducer;
