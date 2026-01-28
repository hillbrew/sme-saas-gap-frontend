import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// 1. Fetch Sessions
export const fetchSessions = createAsyncThunk(
  "sessions/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/auth/sessions?userId=${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch sessions"
      );
    }
  }
);


export const deleteSession = createAsyncThunk(
  "sessions/delete",
  async ({sessionId, userId},  { rejectWithValue }) => {
    try {
      const query = userId ? `?userId=${userId}` : "";
      await api.delete(`/auth/sessions/${sessionId}${query}`);
      return sessionId;
    } catch (err) {
      return rejectWithValue("Failed to delete session");
    }
  }
);

export const logoutAllSessions = createAsyncThunk(
  "sessions/logoutAll",
  async (userId, { rejectWithValue }) => {
    try {
      await api.post(
        `/auth/sessions/logout-all?userId=${userId}`
      );
      return true;
    } catch (err) {
      return rejectWithValue("Failed to logout all sessions");
    }
  }
);
