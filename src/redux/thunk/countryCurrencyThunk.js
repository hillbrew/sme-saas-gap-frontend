import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/**
 * GET all currencies by country_id
 */
export const fetchCountryCurrencies = createAsyncThunk(
  "countryCurrency/fetchByCountry",
  async (countryId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/api/gap/country-currency/get-all?country_id=${countryId}`
      );
      return res.data.currencies;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch country currencies"
      );
    }
  }
);

/**
 * PATCH currency by ID
 */
export const updateCountryCurrency = createAsyncThunk(
  "countryCurrency/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        `/api/gap/country-currency/update-by-id/${id}`,
        data
      );
      return res.data.currency;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to update currency"
      );
    }
  }
);
