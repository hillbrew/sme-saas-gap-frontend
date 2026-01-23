// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import companyActions from "./slices/companyActionSlice";

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    companyActions,
  },
});
