import { createSlice } from "@reduxjs/toolkit";
import { fetchSessions, deleteSession, logoutCurrentSession, logoutAllSessions } from "../thunk/SessionThunk";

const initialState = {
  sessions: [],
  loading: false,
  error: null,
};

const sessionSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessions.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchSessions.fulfilled, (state, action) => { state.loading = false; state.sessions = action.payload; })
      .addCase(fetchSessions.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(deleteSession.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter((s) => s.id !== action.payload);
      })

      .addCase(logoutCurrentSession.fulfilled, (state) => { state.sessions = []; })
      .addCase(logoutAllSessions.fulfilled, (state) => { state.sessions = []; });
  },
});

export default sessionSlice.reducer;
