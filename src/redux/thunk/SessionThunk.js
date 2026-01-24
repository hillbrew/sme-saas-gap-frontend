import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import axios from "axios";


// 1. Get all sessions
export const fetchSessions = createAsyncThunk(
  "sessions/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/sessions");
      return response.data?.sessions ?? [];
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// 2. Delete a session by ID
export const deleteSession = createAsyncThunk(
  "sessions/delete",
  async (sessionId, { rejectWithValue }) => {
    try {
      await api.delete(`/auth/sessions/${sessionId}`);
      return sessionId; // reducer will remove it
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// 3. Logout current session
export const logoutCurrentSession = createAsyncThunk(
  "sessions/logoutCurrent",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/sessions/logout");
      return { success: true };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// 4. Logout all sessions
export const logoutAllSessions = createAsyncThunk(
  "sessions/logoutAll",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/sessions/logout-all");
      return { success: true };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
