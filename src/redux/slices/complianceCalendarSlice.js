// redux/slices/complianceCalendarSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchComplianceCalendars,
  updateComplianceCalendar,
} from "../thunk/complianceCalendarThunk";

const complianceCalendarSlice = createSlice({
  name: "complianceCalendar",
  initialState: {
    data: [],
    fetchLoading: false,
    updateLoading: false,
    error: null,
  },
  reducers: {
    clearComplianceCalendar: (state) => {
      state.data = [];
      state.fetchLoading = false;
      state.updateLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ============== FETCH ============== */
      .addCase(fetchComplianceCalendars.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchComplianceCalendars.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchComplianceCalendars.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      })

      /* ============== UPDATE ============== */
      .addCase(updateComplianceCalendar.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateComplianceCalendar.fulfilled, (state, action) => {
        state.updateLoading = false;
        const idx = state.data.findIndex(
          (c) => c.id === action.payload.id
        );
        if (idx !== -1) {
          state.data[idx] = action.payload;
        }
      })
      .addCase(updateComplianceCalendar.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearComplianceCalendar } =
  complianceCalendarSlice.actions;

export default complianceCalendarSlice.reducer;
