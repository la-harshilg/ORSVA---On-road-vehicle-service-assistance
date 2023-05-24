import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  AddVehicleAPI,
  DeleteVehicleAPI,
  GetVehiclesByUserAPI,
  SelectPrimaryVehicle,
} from "../API";

const initialState = {
  loading: false,
  message: null,
  vehicles: null,
  status: null,
  error: null,
};

export const getVehicles = createAsyncThunk(
  "vehicle/byusers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetVehiclesByUserAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const addVehicle = createAsyncThunk(
  "vehicle/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AddVehicleAPI(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const setPrimaryVehicle = createAsyncThunk(
  "vehicle/setprimary",
  async (vehicleId, { rejectWithValue }) => {
    try {
      const response = await SelectPrimaryVehicle(vehicleId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteVehicle = createAsyncThunk(
  "vehicle/delete",
  async (vehicleId, { rejectWithValue }) => {
    try {
      const response = await DeleteVehicleAPI(vehicleId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: {
    [getVehicles.pending]: (state) => {
      state.loading = true;
      state.message = null;
      state.vehicles = null;
      state.status = null;
      state.error = null;
    },
    [getVehicles.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.vehicles = payload.vehicles;
      state.status = "success";
      state.error = null;
    },
    [getVehicles.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.vehicles = null;
      state.status = "failed";
      state.error = payload;
    },
    [addVehicle.pending]: (state) => {
      state.message = null;
      state.loading = true;
      state.error = null;
    },
    [addVehicle.fulfilled]: (state, { payload }) => {
      state.message = payload.message;
      state.loading = false;
      state.error = null;
      toast.success(state.message);
    },
    [addVehicle.rejected]: (state, { payload }) => {
      state.message = null;
      state.loading = false;
      state.error = payload.data.error;
      toast.error(state.error);
    },
    [deleteVehicle.pending]: (state) => {
      state.loading = true;
      state.message = null;
      state.status = null;
      state.error = null;
    },
    [deleteVehicle.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.status = "success";
      state.error = null;
      toast.success(state.message);
    },
    [deleteVehicle.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.status = "failed";
      state.error = payload.data.error;
      toast.error(state.error);
    },
    [setPrimaryVehicle.pending]: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    [setPrimaryVehicle.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.error = null;
      toast.success(state.message);
    },
    [setPrimaryVehicle.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.error = payload.data.error;
    },
  },
});
