// import { createSlice } from "@reduxjs/toolkit";
// import {
//   fetchEntitlements,
//   fetchPlansManager,
//   updateEntitlements,
// } from "../thunk/plansThunk";

// const initialState = {
//   list: [],
//   count: 0,
//   entitlementsByPlan: {},
//   selectedPlan: null,
//   loading: false,
//   error: null,
// };

// const plansSlice = createSlice({
//   name: "plans",
//   initialState,
//   reducers: {
//     setSelectedPlan(state, action) {
//       state.selectedPlan = action.payload;
//     },
//     resetPlansState() {
//       return initialState;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       /* ---------- PLANS ---------- */
//       .addCase(fetchPlansManager.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPlansManager.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload?.plans || [];
//         state.count = action.payload?.count || 0;
//       })
//       .addCase(fetchPlansManager.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           action.payload || "Failed to load plans";
//       })

//       /* ---------- ENTITLEMENTS ---------- */
//       .addCase(fetchEntitlements.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchEntitlements.fulfilled, (state, action) => {
//         state.loading = false;
//         const { planCode, entitlements } = action.payload;
//         state.entitlementsByPlan[planCode] =
//           entitlements || [];
//       })
//       .addCase(fetchEntitlements.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           action.payload || "Failed to load entitlements";
//       })

//       /* ---------- UPDATE ---------- */
//       .addCase(updateEntitlements.fulfilled, (state, action) => {
//         const { planCode, entitlements } = action.payload;
//         state.entitlementsByPlan[planCode] = entitlements;
//       });
//   },
// });

// export default plansSlice.reducer;

// /* ---------- SELECTORS ---------- */
// export const selectPlans = (state) => state.plans.list;
// export const selectPlansCount = (state) => state.plans.count;
// export const selectSelectedPlan = (state) =>
//   state.plans.selectedPlan;
// export const selectPlansLoading = (state) =>
//   state.plans.loading;
// export const selectPlansError = (state) =>
//   state.plans.error;

// export const selectEntitlementsByPlan = (state) => {
//   const planCode = state.plans.selectedPlan;
//   return planCode
//     ? state.plans.entitlementsByPlan[planCode] || []
//     : [];
// };

// export const {
//   setSelectedPlan,
//   resetPlansState,
// } = plansSlice.actions;



import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPlansManager,
  fetchEntitlements,
  updateEntitlements,
} from "../thunk/plansThunk";

const plansSlice = createSlice({
  name: "plans",
  initialState: {
    plans: [],
    entitlements: [],

    plansLoading: false,
    entitlementsLoading: false,
    updateLoading: false,

    error: null,
  },
  reducers: {
    clearPlansState: (state) => {
      state.plans = [];
      state.entitlements = [];
      state.plansLoading = false;
      state.entitlementsLoading = false;
      state.updateLoading = false;
      state.error = null;
    },
    clearEntitlements: (state) => {
      state.entitlements = [];
      state.entitlementsLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ======================
         FETCH PLANS
         ====================== */
      .addCase(fetchPlansManager.pending, (state) => {
        state.plansLoading = true;
        state.error = null;
      })
      .addCase(fetchPlansManager.fulfilled, (state, action) => {
        state.plansLoading = false;
        state.plans = action.payload?.plans || [];
      })
      .addCase(fetchPlansManager.rejected, (state, action) => {
        state.plansLoading = false;
        state.error = action.payload;
      })

      /* ======================
         FETCH ENTITLEMENTS
         ====================== */
      .addCase(fetchEntitlements.pending, (state) => {
        state.entitlementsLoading = true;
        state.error = null;
      })
      .addCase(fetchEntitlements.fulfilled, (state, action) => {
        state.entitlementsLoading = false;
        state.entitlements = action.payload.entitlements || [];
      })
      .addCase(fetchEntitlements.rejected, (state, action) => {
        state.entitlementsLoading = false;
        state.error = action.payload;
      })

      /* ======================
         UPDATE ENTITLEMENTS
         ====================== */
      .addCase(updateEntitlements.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateEntitlements.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.entitlements = action.payload.entitlements || [];
      })
      .addCase(updateEntitlements.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearPlansState,
  clearEntitlements,
} = plansSlice.actions;

export default plansSlice.reducer;
