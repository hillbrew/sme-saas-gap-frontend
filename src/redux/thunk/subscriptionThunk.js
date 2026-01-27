// redux/thunk/subscriptionThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchCompanySubscription = createAsyncThunk(
  "subscription/fetchCompanySubscription",
  async (companyId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/api/admin/company/${companyId}/subscription`
      );

      return res.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subscription"
      );
    }
  }
);


export const fetchPlans = createAsyncThunk(
  "subscription/fetchPlans",
  async ({ interval,companyId = "month" } = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(
        "/api/subscribers/plans",
        { params: { interval,companyId } }
      );

       return {
        plans: res.data?.plans || [],
        currentPlan: res.data?.currentPlan || null,
        currency: res.data?.currency,
        interval: res.data?.interval,
      };
        } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load plans"
      );
    }
  }
);

export const  changePlan = createAsyncThunk(
  "subscription/changePlan",
  async (
    { companyId, planCode, billing },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(
        "/api/subscribers/billing/change-plan",
        {
          company_id: companyId,
          new_plan_code: planCode,
          interval: billing === "annual" ? "year" : "month",
        }
      );
      
     return res.data.result.currentPlan;
        } catch (err) {
          console.log(err)
      return rejectWithValue(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Plan change failed"
      );
    }
  }
);