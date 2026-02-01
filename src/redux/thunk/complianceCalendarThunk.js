// redux/thunk/complianceCalendarThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* ======================= */
/* GET ALL CALENDARS       */
/* ======================= */
export const fetchComplianceCalendars = createAsyncThunk(
  "complianceCalendar/fetchAll",
  async (countryId, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/gap/compliance-calendar/get", {
        params: { country_id: countryId },
      });
      return res.data.calendars;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch compliance calendars"
      );
    }
  }
);

/* ======================= */
/* UPDATE CALENDAR         */
/* ======================= */
export const updateComplianceCalendar = createAsyncThunk(
  "complianceCalendar/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        `/api/gap/compliance-calendar/update-by-id/${id}`,
        data
      );
      return res.data.complianceCalendar;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to update compliance calendar"
      );
    }
  }
);
