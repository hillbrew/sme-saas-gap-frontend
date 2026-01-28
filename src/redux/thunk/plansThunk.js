// redux/thunk/plansThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* ---------------------------------------------
   Fetch Plans (Admin)
---------------------------------------------- */
export const fetchPlansManager = createAsyncThunk(
  "plans/fetchPlansManager",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/admin/plans/simple");

      // API response:
      // { success, count, plans }
      return {
        plans: res.data?.plans || [],
        count: res.data?.count || 0,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch plans"
      );
    }
  }
);

/* ---------------------------------------------
   Fetch Entitlements by Plan
---------------------------------------------- */
export const fetchEntitlements = createAsyncThunk(
  "plans/fetchEntitlements",
  async (planCode, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/admin/plans/entitlements/${planCode}`);
      return { planCode, entitlements: res.data.entitlements }; // use res.data.entitlements
    } catch (err) {
      console.error("Failed to fetch entitlements", err);
      return rejectWithValue(err.response?.data?.message || "Failed to fetch entitlements");
    }
  }
);

/* ---------------------------------------------
   Update Entitlements
---------------------------------------------- */
export const updateEntitlements = createAsyncThunk(
  "plans/updateEntitlements",
  async (
    { planCode, entitlements },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(
        `/api/admin/plans/entitlements/${planCode}`,
        {
          entitlements, // 👈 REQUIRED wrapper
        }
      );

      return {
        planCode,
        entitlements: res.data?.entitlements || entitlements,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update entitlements"
      );
    }
  }
);
