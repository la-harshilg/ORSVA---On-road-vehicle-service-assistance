import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetAllMechanics,
  GetMechServicesAPI,
  GetNearbyMechanics,
} from "../API";

const initialState = {
  loading: false,
  mechanics: null,
  error: null,
  services: null,
};

export const getnearbyMechanics = createAsyncThunk(
  "mechanic/nearby",
  async ({ location, page }, { rejectWithValue }) => {
    try {
      const response = await GetNearbyMechanics(location, page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getAllMechanics = createAsyncThunk(
  "mechanic/all",
  async (page, { rejectWithValue }) => {
    try {
      const response = await GetAllMechanics(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getMechServices = createAsyncThunk(
  "mechanic/mechservices",
  async ({ mechId, page }, { rejectWithValue }) => {
    try {
      const response = await GetMechServicesAPI(mechId, page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const mechanicSlice = createSlice({
  name: "mechanic",
  initialState,
  reducers: {},
  extraReducers: {
    [getnearbyMechanics.pending]: (state) => {
      state.loading = true;
      state.mechanics = null;
      state.error = null;
    },
    [getnearbyMechanics.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.mechanics = payload.mechanics;
      state.length = payload.length;
      state.error = null;
    },
    [getnearbyMechanics.rejected]: (state, { payload }) => {
      state.loading = false;
      state.mechanics = null;
      state.error = payload;
    },
    [getAllMechanics.pending]: (state) => {
      state.loading = true;
      state.mechanics = null;
      state.error = null;
    },
    [getAllMechanics.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.mechanics = payload.mechanics;
      state.length = payload.length;
      state.error = null;
    },
    [getAllMechanics.rejected]: (state, { payload }) => {
      state.loading = false;
      state.mechanics = null;
      state.error = payload;
    },
    [getMechServices.pending]: (state) => {
      state.loading = true;
      state.services = null;
      state.error = null;
    },
    [getMechServices.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.services = payload.services;
      state.length = payload.length;
      state.error = null;
    },
    [getMechServices.rejected]: (state, { payload }) => {
      state.loading = false;
      state.services = null;
      state.error = payload.data.error;
    },
  },
});
