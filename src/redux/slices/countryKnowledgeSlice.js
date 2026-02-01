import { createSlice } from "@reduxjs/toolkit";
import { fetchCountryKnowledge, updateCountryKnowledge } from "../thunk/countryKnowledgeThunk";


const initialState = {
  data: [],
  fetchLoading: false,
  updateLoading: false,
  fetchError: null,
  updateError: null,
};

const countryKnowledgeSlice = createSlice({
  name: "countryKnowledge",
  initialState,
  reducers: {
    clearCountryKnowledge: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchCountryKnowledge.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchCountryKnowledge.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCountryKnowledge.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload;
      })

      // PATCH
      .addCase(updateCountryKnowledge.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateCountryKnowledge.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateCountryKnowledge.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export const { clearCountryKnowledge } = countryKnowledgeSlice.actions;
export default countryKnowledgeSlice.reducer;
