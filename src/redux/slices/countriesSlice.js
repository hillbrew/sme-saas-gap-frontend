import { createSlice } from "@reduxjs/toolkit";
import { fetchCountries } from "../thunk/countriesThunk";

/**
 * Thunk: fetch all countries
 */


const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    countriesLoading: false,
    countriesError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.countriesLoading = true;
        state.countriesError = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countriesLoading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.countriesLoading = false;
        state.countriesError = action.payload;
      });
  },
});

export default countriesSlice.reducer;
