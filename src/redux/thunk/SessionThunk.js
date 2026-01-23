import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // axios instance

// 1. Get all sessions
export const fetchSessions = createAsyncThunk(
  "sessions/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth/sessions");
      return data.sessions || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch sessions");
    }
  }
);

// 2. Delete a session by ID
export const deleteSession = createAsyncThunk(
  "sessions/delete",
  async (sessionId, { rejectWithValue }) => {
    try {
      await api.delete(`/auth/sessions/${sessionId}`);
      return sessionId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete session");
    }
  }
);

// 3. Logout current session
export const logoutCurrentSession = createAsyncThunk(
  "sessions/logoutCurrent",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/sessions/logout");
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to logout");
    }
  }
);

// 4. Logout all sessions
export const logoutAllSessions = createAsyncThunk(
  "sessions/logoutAll",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/sessions/logout-all");
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to logout all sessions");
    }
  }
);
