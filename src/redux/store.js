// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import companyActions from "./slices/companyActionSlice";
import companyUsersReducer from "../redux/slices/companyUsersSlice";
import sessionReducer from "./slices/sessionSlice";
import subscriptionReducer from "./slices/subscriptionSlice"
import plansReducer from "./slices/plansSlice";

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    companyActions,
    companyUsers: companyUsersReducer,
    sessions: sessionReducer,
    subscription: subscriptionReducer,
    plans:plansReducer
    
  },
});
