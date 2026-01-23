// redux/slice/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthFromStorage: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.clear();
      sessionStorage.clear();
    },
  },
});

export const { setAuthFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;
