import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchCountries = createAsyncThunk(
  "countries/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/gap/countries/getCountries");
      return res.data.countries;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch countries"
      );
    }
  }
);

