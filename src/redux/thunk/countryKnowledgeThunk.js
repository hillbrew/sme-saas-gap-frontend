import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/**
 * GET all knowledge by country_id
 */
export const fetchCountryKnowledge = createAsyncThunk(
  "countryKnowledge/fetchByCountry",
  async (countryId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/api/gap/country-knowledge/get-country-knowledge?country_id=${countryId}`
      );
      return res.data.knowledge;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch country knowledge"
      );
    }
  }
);

/**
 * PATCH knowledge by ID
 */
export const updateCountryKnowledge = createAsyncThunk(
  "countryKnowledge/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        `/api/gap/country-knowledge/update-country-knowledge/${id}`,
        data
      );
      return res.data.knowledge;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to update country knowledge"
      );
    }
  }
);
