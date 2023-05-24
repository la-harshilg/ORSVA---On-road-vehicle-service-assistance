import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddServiceAPI,
  DeleteServiceAPI,
  GetServicesByMechanicsAPI,
} from "../API";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  services: null,
  message: null,
  error: null,
};

export const addService = createAsyncThunk(
  "service/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AddServiceAPI(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getServicesByMechanic = createAsyncThunk(
  "service/bymechanics",
  async (page, { rejectWithValue }) => {
    try {
      const response = await GetServicesByMechanicsAPI(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteService = createAsyncThunk(
  "service/delete",
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await DeleteServiceAPI(serviceId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: {
    [addService.pending]: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    [addService.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.error = null;
      toast.success("New service added successfully.");
    },
    [addService.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.error = payload.data.error;
    },
    [getServicesByMechanic.pending]: (state) => {
      state.loading = true;
      state.services = null;
      state.message = null;
      state.error = null;
      state.length = null;
    },
    [getServicesByMechanic.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.services = payload.services;
      state.error = null;
      state.length = payload.length;
    },
    [getServicesByMechanic.rejected]: (state, { payload }) => {
      state.loading = false;
      state.services = null;
      state.message = null;
      state.error = payload.data.error;
      state.length = null;
    },
    [deleteService.pending]: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    [deleteService.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.error = null;
      toast.success("Service deleted successfully.");
    },
    [deleteService.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.error = payload.data.error;
    },
  },
});
