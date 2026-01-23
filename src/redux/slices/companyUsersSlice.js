import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCompanyUsers,
  fetchInactiveCompanyUsers,
  updateCompanyUserRole,
  deactivateCompanyUser,
  activateCompanyUser,
} from "../thunk/Thunk";

const initialState = {
    companyUsers: [],
    inactiveUsers: [],
    loadingUsers: false,
    loadingAction: false,
    error: null,
};

const companyUsersSlice = createSlice({
  name: "companyUsers",
  initialState,
  reducers: {
    clearCompanyUsersState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= FETCH USERS ================= */
      .addCase(fetchCompanyUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanyUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.companyUsers = action.payload;
      })
      .addCase(fetchCompanyUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= INACTIVE USERS ================= */
      .addCase(fetchInactiveCompanyUsers.fulfilled, (state, action) => {
        state.inactiveUsers = action.payload;
      })

      /* ================= UPDATE ROLE ================= */
      .addCase(updateCompanyUserRole.fulfilled, (state, action) => {
        const user = state.companyUsers.find(
          (u) => u.id === action.payload.userId
        );
        if (user) user.role = action.payload.role;
      })

      /* ================= DEACTIVATE ================= */
      .addCase(deactivateCompanyUser.fulfilled, (state, action) => {
        const user = state.companyUsers.find(
          (u) => u.id === action.payload.userId
        );
        if (user) user.is_active = false;
      })

      /* ================= ACTIVATE ================= */
      .addCase(activateCompanyUser.fulfilled, (state, action) => {
        const user = state.companyUsers.find(
          (u) => u.id === action.payload.userId
        );
        if (user) user.is_active = true;
      });
  },
});

export const { clearCompanyUsersState } = companyUsersSlice.actions;
export default companyUsersSlice.reducer;
