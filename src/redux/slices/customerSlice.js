import { createSlice } from "@reduxjs/toolkit";
import { fetchCustomers, fetchUserCompanies, fetchCompanyUsers, fetchCompanyProfile } from "../thunk/Thunk";
import { activateCompany, deactivateCompany,} from "../thunk/Thunk";

const initialState = {
  customers: [],
  companies: [],
  companyUsers: [],
  profile: null,
  profileLoading: false,
  profileError: null,

  // Loading & error states
  customersLoading: false,
  customersError: null,
  companiesForCustomerId: null,
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
        state.companiesForCustomerId = action.payload.customerId;
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
      })
      /* ================= DEACTIVATE COMPANY ================= */
      .addCase(deactivateCompany.fulfilled, (state, action) => {
        const { companyId } = action.payload;

        const company = state.companies.find(
          (c) => c.id === companyId
        );

        if (company) {
          company.is_active = false;
        }
      })

      /* ================= ACTIVATE COMPANY ================= */
      .addCase(activateCompany.fulfilled, (state, action) => {
        const { companyId } = action.payload;
        const company = state.companies.find(
          (c) => c.id === companyId
        );
        if (company) {
          company.is_active = true;
        }
      })

      .addCase(fetchCompanyProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(fetchCompanyProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchCompanyProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
      });
  },
});

export default customerSlice.reducer;
