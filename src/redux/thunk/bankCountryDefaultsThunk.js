import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/**
 * GET by country_id
 */
export const fetchBankCountryDefaults = createAsyncThunk(
  "bankCountryDefaults/fetchByCountry",
  async (countryId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/api/gap/bank-country-defaults/get?country_id=${countryId}`
      );
      return res.data.bankDefaults;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch bank defaults"
      );
    }
  }
);

/**
 * PATCH by ID
 */
export const updateBankCountryDefault = createAsyncThunk(
  "bankCountryDefaults/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        `/api/gap/bank-country-defaults/update-by-id/${id}`,
        data
      );
      return res.data.bankDefault;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to update bank default"
      );
    }
  }
);
