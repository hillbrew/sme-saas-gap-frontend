import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCompanyUsers,
  fetchInactiveCompanyUsers,
  updateCompanyUserRole,
  deactivateCompanyUser,
  activateCompanyUser,
} from "../thunk/thunk";

const companyUsersSlice = createSlice({
  name: "companyUsers",
  initialState: {
    companyUsers: [],   // active + all users
    inactiveUsers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 FETCH COMPANY USERS
      .addCase(fetchCompanyUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.companyUsers = action.payload;
      })
      .addCase(fetchCompanyUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 FETCH INACTIVE USERS
      .addCase(fetchInactiveCompanyUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInactiveCompanyUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.inactiveUsers = action.payload;
      })
      .addCase(fetchInactiveCompanyUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 UPDATE ROLE
      .addCase(updateCompanyUserRole.fulfilled, (state, action) => {
        const user = state.companyUsers.find(
          (u) => u.user_id === action.payload.userId
        );
        if (user) user.role = action.payload.role;
      })

      // 🔹 DEACTIVATE USER
      .addCase(deactivateCompanyUser.fulfilled, (state, action) => {
        const user = state.companyUsers.find(
          (u) => u.user_id === action.payload
        );
        if (user) user.is_active = false;
      })

      // 🔹 ACTIVATE USER
      .addCase(activateCompanyUser.fulfilled, (state, action) => {
        const user = state.companyUsers.find(
          (u) => u.user_id === action.payload
        );
        if (user) user.is_active = true;

        // remove from inactiveUsers list if present
        state.inactiveUsers = state.inactiveUsers.filter(
          (u) => u.user_id !== action.payload
        );
      });
  },
});

export default companyUsersSlice.reducer;
