// redux/slices/subscriptionSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCompanySubscription } from "../thunk/subscriptionThunk";

const initialState = {
  data: null,
  loading: false,
  error: null,
  companyId: null,
  plans: [],
  plansLoading: false,
  fetchPlansError:null
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
      })

       .addCase(fetchPlans.pending, (state) => {
        state.plansLoading = true;
        state.fetchPlansError = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.plansLoading = false;
        state.plans = action.payload.plans;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.plansLoading = false;
        state.fetchPlansError = action.payload;
      })
  },
});

export const { clearSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
