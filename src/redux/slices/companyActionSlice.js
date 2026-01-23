import { createSlice } from "@reduxjs/toolkit";
import { deactivateCompany, activateCompany,deleteCompany, } from "../thunk/Thunk";

const initialState = {
    actionLoading: false,
    actionError: null,

    lastAction: null,
    lastActionCompanyId: null,
    affectedUsersCount: null,
};

const companyAdminSlice = createSlice({
    name: "adminCompany",
    initialState,
    reducers: {
        clearCompanyActionState: (state) => {
            state.actionLoading = false;
            state.actionError = null;
            state.lastAction = null;
            state.lastActionCompanyId = null;
            state.affectedUsersCount = null;
        },
    },
    extraReducers: (builder) => {
        builder
            /* ===================== DEACTIVATE ===================== */
            .addCase(deactivateCompany.pending, (state, action) => {
                state.actionLoading = true;
                state.actionError = null;
                state.lastAction = "deactivate";
                state.lastActionCompanyId = action.meta.arg; 
            })
            .addCase(deactivateCompany.fulfilled, (state, action) => {
                state.actionLoading = false;
                state.affectedUsersCount = action.payload.affectedUsers;
            })
            .addCase(deactivateCompany.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload;
            })

            /* ===================== ACTIVATE ===================== */
            .addCase(activateCompany.pending, (state, action) => {
                state.actionLoading = true;
                state.actionError = null;
                state.lastAction = "activate";
                state.lastActionCompanyId = action.meta.arg; // 
            })
            .addCase(activateCompany.fulfilled, (state, action) => {
                state.actionLoading = false;
                state.affectedUsersCount = action.payload.affectedUsers;
            })
            .addCase(activateCompany.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload;
            })
            .addCase(deleteCompany.pending, (state, action) => {
                state.actionLoading = true;
                state.actionError = null;
                state.lastAction = "delete";
                state.lastActionCompanyId = action.meta.arg;
              })
              .addCase(deleteCompany.fulfilled, (state) => {
                state.actionLoading = false;
              })
              .addCase(deleteCompany.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload;
              });
    },
});

export const {
    clearCompanyActionState,
} = companyAdminSlice.actions;

export default companyAdminSlice.reducer;
