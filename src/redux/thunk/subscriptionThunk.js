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
