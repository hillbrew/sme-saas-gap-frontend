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




// Fetch inactive users
export const fetchInactiveCompanyUsers = createAsyncThunk(
  "companyUsers/fetchInactiveCompanyUsers",
  async (companyId, thunkAPI) => {
    try {
      const res = await api.get(`api/books/company/${companyId}/inactive/users`);
      return res.data.users;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// Update user role
export const updateCompanyUserRole = createAsyncThunk(
  "companyUsers/updateUserRole",
  async ({ companyId, userId, role }, thunkAPI) => {
    try {
      const response = await api.put(
        `api/books/company/${companyId}/users/${userId}/role`,
        { role } // <-- send role in body
      );
      return { userId, role };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);


// Deactivate user
export const deactivateCompanyUser = createAsyncThunk(
  "companyUsers/deactivateUser",
  async ({ companyId, userId }, thunkAPI) => {
    try {
      await api.put(`api/books/company/${companyId}/users/${userId}/deactivate`);
      return userId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// Activate user
// src/redux/thunk/Thunk.js
export const activateCompanyUser = createAsyncThunk(
  "companyUsers/activateUser",
  async ({ companyId, userId }, thunkAPI) => {
    if (!companyId || !userId) {
      return thunkAPI.rejectWithValue("Missing companyId or userId");
    }

    try {
      // Make sure the endpoint is correct
      const response = await api.put(
        `api/books/company/${companyId}/users/${userId}/activate`
      );
      // Return the company user ID so the reducer can update state
      return userId;
    } catch (err) {
      // Send meaningful error message
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


