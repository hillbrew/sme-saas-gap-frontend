import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEntitlements,
  fetchPlansManager,
  updateEntitlements,
} from "../thunk/PlansThunk";

const initialState = {
  list: [],
  count: 0,
  entitlementsByPlan: {},
  selectedPlan: null,
  loading: false,
  error: null,
};

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    setSelectedPlan(state, action) {
      state.selectedPlan = action.payload;
    },
    resetPlansState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PLANS ---------- */
      .addCase(fetchPlansManager.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlansManager.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload?.plans || [];
        state.count = action.payload?.count || 0;
      })
      .addCase(fetchPlansManager.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to load plans";
      })

      /* ---------- ENTITLEMENTS ---------- */
      .addCase(fetchEntitlements.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEntitlements.fulfilled, (state, action) => {
        state.loading = false;
        const { planCode, entitlements } = action.payload;
        state.entitlementsByPlan[planCode] =
          entitlements || [];
      })
      .addCase(fetchEntitlements.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to load entitlements";
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateEntitlements.fulfilled, (state, action) => {
        const { planCode, entitlements } = action.payload;
        state.entitlementsByPlan[planCode] = entitlements;
      });
  },
});

export default plansSlice.reducer;

/* ---------- SELECTORS ---------- */
export const selectPlans = (state) => state.plans.list;
export const selectPlansCount = (state) => state.plans.count;
export const selectSelectedPlan = (state) =>
  state.plans.selectedPlan;
export const selectPlansLoading = (state) =>
  state.plans.loading;
export const selectPlansError = (state) =>
  state.plans.error;

export const selectEntitlementsByPlan = (state) => {
  const planCode = state.plans.selectedPlan;
  return planCode
    ? state.plans.entitlementsByPlan[planCode] || []
    : [];
};

export const {
  setSelectedPlan,
  resetPlansState,
} = plansSlice.actions;
