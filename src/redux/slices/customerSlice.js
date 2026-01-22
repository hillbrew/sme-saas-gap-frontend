import { createSlice } from "@reduxjs/toolkit";
import { fetchCustomers, fetchUserCompanies, fetchCompanyUsers } from "../thunk/Thunk";

const initialState = {
  customers: [],
  companies: [],
  companyUsers: [],

  // Loading & error states
  customersLoading: false,
  customersError: null,
  companiesLoading: false,
  companiesError: null,
  companyUsersLoading: false,
  companyUsersError: null,
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ===== Fetch Customers =====
      .addCase(fetchCustomers.pending, (state) => {
        state.customersLoading = true;
        state.customersError = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.customersLoading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.customersLoading = false;
        state.customersError = action.payload;
      })

      // ===== Fetch Companies =====
      .addCase(fetchUserCompanies.pending, (state) => {
        state.companiesLoading = true;
        state.companiesError = null;
      })
      .addCase(fetchUserCompanies.fulfilled, (state, action) => {
        state.companiesLoading = false;
        state.companies = action.payload;
      })
      .addCase(fetchUserCompanies.rejected, (state, action) => {
        state.companiesLoading = false;
        state.companiesError = action.payload;
      })

      // ===== Fetch Company Users =====
      .addCase(fetchCompanyUsers.pending, (state) => {
        state.companyUsersLoading = true;
        state.companyUsersError = null;
      })
      .addCase(fetchCompanyUsers.fulfilled, (state, action) => {
        state.companyUsersLoading = false;
        state.companyUsers = action.payload;
      })
      .addCase(fetchCompanyUsers.rejected, (state, action) => {
        state.companyUsersLoading = false;
        state.companyUsersError = action.payload;
      });
  },
});

export default customerSlice.reducer;
