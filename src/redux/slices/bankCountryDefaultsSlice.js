import { createSlice } from "@reduxjs/toolkit";
import { fetchBankCountryDefaults, updateBankCountryDefault } from "../thunk/bankCountryDefaultsThunk";


const initialState = {
  data: [],
  loading: false,
  updating: false,
  error: null,
};

const bankCountryDefaultsSlice = createSlice({
  name: "bankCountryDefaults",
  initialState,
  reducers: {
    clearBankCountryDefaults: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchBankCountryDefaults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBankCountryDefaults.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBankCountryDefaults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PATCH
      .addCase(updateBankCountryDefault.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateBankCountryDefault.fulfilled, (state, action) => {
        state.updating = false;
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateBankCountryDefault.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});
export const { clearBankCountryDefaults } =
  bankCountryDefaultsSlice.actions;

export default bankCountryDefaultsSlice.reducer;
