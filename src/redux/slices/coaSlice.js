// redux/slices/coaSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCoaTemplates,
  createCoaTemplate,
  updateCoaTemplate,
  deleteCoaTemplate,
} from "../thunk/coaThunk";

const coaSlice = createSlice({
  name: "coa",
  initialState: {
    data: [],
    fetchLoading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {
    clearCoaState: (state) => {
      state.data = [];
      state.fetchLoading = false;
      state.actionLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= FETCH ================= */
      .addCase(fetchCoaTemplates.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchCoaTemplates.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCoaTemplates.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      })

      /* ================= CREATE ================= */
      .addCase(createCoaTemplate.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(createCoaTemplate.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.data.push(action.payload);
      })
      .addCase(createCoaTemplate.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* ================= UPDATE ================= */
      .addCase(updateCoaTemplate.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateCoaTemplate.fulfilled, (state, action) => {
        state.actionLoading = false;
        const idx = state.data.findIndex(
          (t) => t.id === action.payload.id
        );
        if (idx !== -1) {
          state.data[idx] = action.payload;
        }
      })
      .addCase(updateCoaTemplate.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* ================= DELETE ================= */
      .addCase(deleteCoaTemplate.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteCoaTemplate.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.data = state.data.filter(
          (t) => t.id !== action.payload
        );
      })
      .addCase(deleteCoaTemplate.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCoaState } = coaSlice.actions;
export default coaSlice.reducer;
