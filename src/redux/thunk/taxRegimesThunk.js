// redux/thunk/taxRegimesThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* ======================= */
/* GET TAX REGIMES         */
/* ======================= */
export const fetchTaxRegimes = createAsyncThunk(
  "taxRegimes/fetchAll",
  async (countryId, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/gap/tax-regimes/get", {
        params: { country_id: countryId },
      });
      return res.data.taxRegimes;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch tax regimes"
      );
    }
  }
);

/* ======================= */
/* UPDATE TAX REGIME       */
/* ======================= */
export const updateTaxRegime = createAsyncThunk(
  "taxRegimes/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/api/gap/tax-regimes/update/${id}`, data);
      return res.data.taxRegime;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to update tax regime"
      );
    }
  }
);
