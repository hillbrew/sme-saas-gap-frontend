// redux/thunk/coaThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* ======================= */
/* GET ALL COA TEMPLATES   */
/* ======================= */
export const fetchCoaTemplates = createAsyncThunk(
  "coa/fetchAll",
  async (countryIsoCode, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/gap/coa/getCOA", {
        params: { country_iso_code: countryIsoCode },
      });
      return res.data.templates;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch COA templates"
      );
    }
  }
);

/* ======================= */
/* CREATE COA TEMPLATE     */
/* ======================= */
export const createCoaTemplate = createAsyncThunk(
  "coa/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/gap/coa/createCOA", payload);
      return res.data.template;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to create COA template"
      );
    }
  }
);

/* ======================= */
/* UPDATE COA TEMPLATE     */
/* ======================= */
export const updateCoaTemplate = createAsyncThunk(
  "coa/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/gap/coa/updateCOA/${id}`, data);
      return res.data.template;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to update COA template"
      );
    }
  }
);

/* ======================= */
/* DELETE COA TEMPLATE     */
/* ======================= */
export const deleteCoaTemplate = createAsyncThunk(
  "coa/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/gap/coa/deleteCOA/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to delete COA template"
      );
    }
  }
);
