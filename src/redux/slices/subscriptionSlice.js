// redux/slices/subscriptionSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCompanySubscription } from "../thunk/subscriptionThunk";

const initialState = {
  data: null,
  loading: false,
  error: null,
  companyId: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    clearSubscriptionState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanySubscription.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.companyId = action.meta.arg;
      })
      .addCase(fetchCompanySubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompanySubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
