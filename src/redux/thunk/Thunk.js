import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/admin/listCustomers");
      return data.users;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load customers"
      );
    }
  }
);

export const fetchUserCompanies = createAsyncThunk(
  "customers/fetchUserCompanies",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/books/company/companies", {
        params: { user_id: userId },
      });

      return data.companies; // ✅ IMPORTANT
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load companies"
      );
    }
  }
);

export const fetchCompanyUsers = createAsyncThunk(
  "customers/fetchCompanyUsers",
  async (companyId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/books/company/${companyId}/users`);
      return data.users || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load users");
    }
  }
);


export const deactivateCompany = createAsyncThunk(
  "adminCompany/deactivate",
  async (companyId, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        `/api/admin/companies/${companyId}/deactivate`
      );
      return {
        companyId,
        ...res.data,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to deactivate company"
      );
    }
  }
);


export const activateCompany = createAsyncThunk(
  "adminCompany/activate",
  async (companyId, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        `/api/admin/companies/${companyId}/activate`
      );
      return {
        companyId,
        ...res.data,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to activate company"
      );
    }
  }
);