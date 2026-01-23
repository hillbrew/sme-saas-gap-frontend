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

export const deleteCompany = createAsyncThunk(
  "adminCompany/delete",
  async (companyId, { rejectWithValue }) => {
    try {
      await api.delete(
        `/api/books/company/companies/${companyId}`
      );
      return { companyId };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete company"
      );
    }
  }
);


export const fetchInactiveCompanyUsers = createAsyncThunk(
  "companyUsers/fetchInactive",
  async (companyId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/books/company/${companyId}/inactive/users`);
      return data.users || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load inactive users");
    }
  }
);

export const updateCompanyUserRole = createAsyncThunk(
  "companyUsers/updateRole",
  async ({ companyId, userId, role }, { rejectWithValue }) => {
    try {
      await api.put(`/api/books/company/${companyId}/users/${userId}/role`, { role });
      return { userId, role };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update role");
    }
  }
);

export const deactivateCompanyUser = createAsyncThunk(
  "companyUsers/deactivate",
  async ({ companyId, userId }, { rejectWithValue }) => {
    try {
      await api.put(`/api/books/company/${companyId}/users/${userId}/deactivate`);
      return { userId };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to deactivate user");
    }
  }
);


export const activateCompanyUser = createAsyncThunk(
  "companyUsers/activate",
  async ({ companyId, userId }, { rejectWithValue }) => {
    try {
      await api.put(`/api/books/company/${companyId}/users/${userId}/activate`);
      return { userId };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to activate user");
    }
  }
);

