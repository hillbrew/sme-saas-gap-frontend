import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchWebhookLogs = createAsyncThunk(
  "webhookLogs/fetch",
  async (
    {
      provider = "all",
      logId,            
      eventName,
      date,
      continuationToken,
      limit = 50,
      includeContent = true,
    },
    { rejectWithValue }
  ) => {
    try {
      const params = {
        provider,
        limit,
        includeContent,
      };

      if (logId) params.logId = logId; 
      if (eventName) params.eventName = eventName;
      if (date) params.date = date;
      if (continuationToken) params.continuationToken = continuationToken;

      const res = await api.get("/api/admin/webhooks/logs", { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch webhook logs"
      );
    }
  }
);
