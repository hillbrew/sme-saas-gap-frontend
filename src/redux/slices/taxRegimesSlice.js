// redux/slices/taxRegimesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTaxRegimes,
  updateTaxRegime,
} from "../thunk/taxRegimesThunk";

const taxRegimesSlice = createSlice({
  name: "taxRegimes",
  initialState: {
    data: [],
    fetchLoading: false,
    updateLoading: false,
    error: null,
  },
  reducers: {
    clearTaxRegimes: (state) => {
      state.data = [];
      state.fetchLoading = false;
      state.updateLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ============== FETCH ============== */
      .addCase(fetchTaxRegimes.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchTaxRegimes.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTaxRegimes.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      })

      /* ============== UPDATE ============== */
      .addCase(updateTaxRegime.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateTaxRegime.fulfilled, (state, action) => {
        state.updateLoading = false;
        const idx = state.data.findIndex(
          (r) => r.id === action.payload.id
        );
        if (idx !== -1) {
          state.data[idx] = action.payload;
        }
      })
      .addCase(updateTaxRegime.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTaxRegimes } = taxRegimesSlice.actions;
export default taxRegimesSlice.reducer;
