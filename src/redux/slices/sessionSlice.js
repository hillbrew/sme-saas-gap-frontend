

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSessions,
  deleteSession,
  logoutAllSessions,
} from "../thunk/SessionThunk";

const sessionSlice = createSlice({
  name: "sessions",
  initialState: {
    sessions: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSessions: (state) => {
      state.sessions = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ======================
         FETCH SESSIONS
         ====================== */
      .addCase(fetchSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ======================
         DELETE SINGLE SESSION
         ====================== */
      .addCase(deleteSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = state.sessions.filter(
          (s) => s.id !== action.payload
        );
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ======================
         LOGOUT ALL SESSIONS
         ====================== */
      .addCase(logoutAllSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAllSessions.fulfilled, (state) => {
        state.loading = false;
        state.sessions = [];
      })
      .addCase(logoutAllSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSessions } = sessionSlice.actions;
export default sessionSlice.reducer;
