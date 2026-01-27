// redux/slices/subscriptionSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { changePlan, fetchCompanySubscription, fetchPlans } from "../thunk/subscriptionThunk";

const initialState = {
  data: null,
  loading: false,
  error: null,
  companyId: null,
  plans: [],
  plansLoading: false,
  fetchPlansError:null,
 downgradingPlanCode: null,  
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
      .addCase(changePlan.pending, (state, action) => {
        state.downgradingPlanCode = action.meta.arg.planCode;
        state.changePlanError = null;
      })
      .addCase(changePlan.fulfilled, (state, action) => {
        state.downgradingPlanCode = null;
        state.data = {
          ...state.data,
          ...action.payload,
        };
      })
      .addCase(changePlan.rejected, (state, action) => {
        state.downgradingPlanCode = null;
        state.changePlanError = action.payload;
      })
  },
});

export const { clearSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
