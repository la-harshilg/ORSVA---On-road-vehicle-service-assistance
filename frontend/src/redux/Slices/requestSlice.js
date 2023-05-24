import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateRequestAPI,
  GetMechanicsRequests,
  GetPendingRequests,
  GetRequestById,
  GetRequestsByuser,
  TotalRequestsAPI,
  UpdateRequestStatusAPI,
  WeekWiseRequestsAPI,
} from "../API";

const initialState = {
  loading: false,
  requests: null,
  message: null,
  error: null,
};

export const createRequest = createAsyncThunk(
  "request/create",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await CreateRequestAPI(data);
      navigate("/user/requests");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getUserRequests = createAsyncThunk(
  "request/byusers",
  async (page, { rejectWithValue }) => {
    try {
      const response = await GetRequestsByuser(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getRequestById = createAsyncThunk(
  "request/byid",
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await GetRequestById(requestId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getMechanicsRequests = createAsyncThunk(
  "request/bymechanics",
  async (page, { rejectWithValue }) => {
    try {
      const response = await GetMechanicsRequests(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getPendingRequests = createAsyncThunk(
  "request/pendingrequests",
  async (page, { rejectWithValue }) => {
    try {
      const response = await GetPendingRequests(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getTotalRequests = createAsyncThunk(
  "request/totalrequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await TotalRequestsAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getWeekwiseRequests = createAsyncThunk(
  "request/weekdaywise",
  async (_, { rejectWithValue }) => {
    try {
      const response = await WeekWiseRequestsAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateStatusRequest = createAsyncThunk(
  "request/updatestatus",
  async ({ requestId, status }, { rejectWithValue }) => {
    try {
      const response = await UpdateRequestStatusAPI(requestId, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {},
  extraReducers: {
    [createRequest.pending]: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    [createRequest.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.error = null;
    },
    [createRequest.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.error = payload.data.error;
    },
    [getUserRequests.pending]: (state) => {
      state.loading = true;
      state.requests = null;
      state.error = null;
    },
    [getUserRequests.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.requests = payload.requests;
      state.length = payload.length;
      state.error = null;
    },
    [getUserRequests.rejected]: (state, { payload }) => {
      state.loading = false;
      state.requests = null;
      state.error = payload.data.error;
    },
    [getRequestById.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.request = null;
    },
    [getRequestById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.request = payload.request;
    },
    [getRequestById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.data.error;
      state.request = null;
    },
    [getMechanicsRequests.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.requests = null;
    },
    [getMechanicsRequests.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.requests = payload.requests;
      state.length = payload.totalReq;
    },
    [getMechanicsRequests.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.data.error;
      state.requests = null;
    },
    [getPendingRequests.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.requests = null;
    },
    [getPendingRequests.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.requests = payload.requests;
      state.length = payload.totalReq;
    },
    [getPendingRequests.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.data.error;
      state.requests = null;
    },
    [updateStatusRequest.pending]: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    [updateStatusRequest.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.error = null;
    },
    [updateStatusRequest.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.error = payload.data.error;
    },
    [getTotalRequests.pending]: (state) => {
      state.totalRequests = null;
      state.totalPendingRequests = null;
      state.totalApprovedRequests = null;
      state.totalinprogressRequests = null;
      state.totalcancelledrequests = null;
    },
    [getTotalRequests.fulfilled]: (state, { payload }) => {
      state.totalRequests = payload.totalRequests;
      state.totalPendingRequests = payload.totalPendingRequests;
      state.totalApprovedRequests = payload.totalApprovedRequests;
      state.totalinprogressRequests = payload.totalInprogressRequests;
      state.totalcancelledrequests = payload.totalCancelledRequests;
    },
    [getTotalRequests.rejected]: (state, { payload }) => {
      state.totalRequests = null;
      state.totalPendingRequests = null;
      state.totalApprovedRequests = null;
      state.totalinprogressRequests = null;
      state.totalcancelledrequests = null;
      state.error = payload.data.error;
    },
    [getWeekwiseRequests.pending]: (state) => {
      state.dayrequests = null;
      state.error = null;
    },
    [getWeekwiseRequests.fulfilled]: (state, { payload }) => {
      state.dayrequests = payload.data;
      state.error = null;
    },
    [getWeekwiseRequests.rejected]: (state, { payload }) => {
      state.dayrequests = null;
      state.error = payload.data.error;
    },
  },
});
