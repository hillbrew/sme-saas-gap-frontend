import { createSlice } from "@reduxjs/toolkit";

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
});

export const { clearSessions } = sessionSlice.actions;
export default sessionSlice.reducer;
