// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import companyActions from "./slices/companyActionSlice";
import companyUsersReducer from "../redux/slices/companyUsersSlice";
import sessionReducer from "./slices/sessionSlice";


export const store = configureStore({
  reducer: {
    customers: customerReducer,
    companyActions,
    companyUsers: companyUsersReducer,
    sessions: sessionReducer,
  },
});
