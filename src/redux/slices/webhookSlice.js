import { createSlice } from "@reduxjs/toolkit";
import { fetchWebhookLogs } from "../thunk/webhookThunk";

const initialState = {
  logs: [],
  pagination: {
    limit: 50,
    hasMore: false,
    nextToken: null,
  },
  loading: false,
  error: null,
};

const webhookLogsSlice = createSlice({
  name: "webhookLogs",
  initialState,
  reducers: {
    clearWebhookLogs: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebhookLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWebhookLogs.fulfilled, (state, action) => {
        state.loading = false;
        const { logs, pagination } = action.payload;

        // append only when paginating
        if (pagination?.nextToken && state.logs.length > 0) {
          state.logs.push(...logs);
        } else {
          state.logs = logs;
        }

        state.pagination = pagination;
      })
      .addCase(fetchWebhookLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWebhookLogs } = webhookLogsSlice.actions;
export default webhookLogsSlice.reducer;
