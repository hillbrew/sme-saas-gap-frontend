// redux/slice/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { clearSessions } from "./sessionSlice";

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
    logout: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.clear();
      sessionStorage.clear();

      // Dispatch clearSessions if a dispatch is provided
      if (action.payload?.dispatch) {
        action.payload.dispatch(clearSessions());
      }
    },
  },
});

export const { setAuthFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;
