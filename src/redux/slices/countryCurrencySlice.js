import { createSlice } from "@reduxjs/toolkit";
import { fetchCountryCurrencies, updateCountryCurrency } from "../thunk/countryCurrencyThunk";


const initialState = {
  data: [],
  fetchLoading: false,
  updateLoading: false,
  fetchError: null,
  updateError: null,
};

const countryCurrencySlice = createSlice({
  name: "countryCurrency",
  initialState,
  reducers: {
    clearCountryCurrency: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchCountryCurrencies.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchCountryCurrencies.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCountryCurrencies.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload;
      })

      // PATCH
      .addCase(updateCountryCurrency.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateCountryCurrency.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateCountryCurrency.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export const { clearCountryCurrency } = countryCurrencySlice.actions;
export default countryCurrencySlice.reducer;
