import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  GetUserProfile,
  MechanicDeleteAccount,
  MechanicLoginAPI,
  MechanicLogoutAPI,
  MechanicRegisterAPI,
  UserDeleteAccount,
  UserForgotPassword,
  UserLoginAPI,
  UserLogoutAPI,
  UserRegisterAPI,
  UserResetPassword,
} from "../API";

const initialState = {
  profile: null,
  token: null,
  loading: false,
  error: null,
};
export const signUpUser = createAsyncThunk(
  "user/signup",
  async ({ user, navigate }, { rejectWithValue }) => {
    try {
      const response = await UserRegisterAPI(user);
      navigate("/nearbymechanics");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/signin",
  async ({ user, navigate }, { rejectWithValue }) => {
    try {
      const response = await UserLoginAPI(user);
      navigate("/nearbymechanics");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const response = await UserLogoutAPI();
      console.log(response.data);
      navigate("/signin");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  }
);

export const userforgotPassword = createAsyncThunk(
  "user/forgotpassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await UserForgotPassword(data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  }
);

export const userresetPassword = createAsyncThunk(
  "user/resetpassword",
  async ({ navigate, resettoken, data }, { rejectWithValue }) => {
    try {
      const response = await UserResetPassword(resettoken, data);
      navigate("/signin");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  }
);

export const userdeleteAccount = createAsyncThunk(
  "user/deleteaccount",
  async (navigate, { rejectWithValue }) => {
    try {
      const response = await UserDeleteAccount();
      navigate("/user/signup");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  }
);

export const signUpMechanic = createAsyncThunk(
  "signup/mechanic",
  async ({ mechanic, navigate }, { rejectWithValue }) => {
    try {
      const response = await MechanicRegisterAPI(mechanic);
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const signInMechanic = createAsyncThunk(
  "mechanic/signin",
  async ({ mechanic, navigate }, { rejectWithValue }) => {
    try {
      const response = await MechanicLoginAPI(mechanic);
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetUserProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const logoutMechanic = createAsyncThunk(
  "mechanic/logout",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const response = await MechanicLogoutAPI();
      navigate("/signin");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const mechanicdeleteAccount = createAsyncThunk(
  "user/deleteaccount",
  async (navigate, { rejectWithValue }) => {
    try {
      const response = await MechanicDeleteAccount();
      navigate("/mechanic/signup");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [signUpUser.pending]: (state) => {
      state.profile = null;
      state.token = null;
      state.loading = true;
      state.error = null;
    },
    [signUpUser.fulfilled]: (state, { payload }) => {
      state.profile = payload.user;
      state.token = payload.token;
      state.loading = false;
      state.error = null;
      state.role = "user";
      localStorage.setItem("token", payload.token);
    },
    [signUpUser.rejected]: (state, { payload }) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = payload.data.error;
      console.log(state.error);
      toast.error(state.error);
    },
    [signInUser.pending]: (state) => {
      state.profile = null;
      state.token = null;
      state.loading = true;
      state.error = null;
    },
    [signInUser.fulfilled]: (state, { payload }) => {
      state.profile = payload.user;
      state.token = payload.token;
      state.loading = false;
      state.error = null;
      state.role = "user";
      localStorage.setItem("token", payload.token);
    },
    [signInUser.rejected]: (state, { payload }) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = payload.data.error;
      toast.error(state.error);
    },
    [getUserProfile.pending]: (state) => {
      state.profile = null;
      state.error = null;
      state.loading = true;
    },
    [getUserProfile.fulfilled]: (state, { payload }) => {
      state.profile = payload.user;
      state.error = null;
      state.loading = false;
    },
    [getUserProfile.rejected]: (state, { payload }) => {
      state.profile = null;
      state.error = payload.data.error;
      state.loading = false;
    },
    [logoutUser.fulfilled]: (state) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.role = null;
      localStorage.clear();
    },
    [userforgotPassword.pending]: (state) => {
      state.message = null;
      state.loading = true;
    },
    [userforgotPassword.fulfilled]: (state, { payload }) => {
      state.message = payload.message;
      state.loading = false;
      toast.success(state.message);
    },
    [userforgotPassword.rejected]: (state, { payload }) => {
      state.message = payload.data.message;
      state.loading = false;
      toast.error(state.message);
    },
    [userresetPassword.pending]: (state) => {
      state.message = null;
      state.loading = true;
    },
    [userresetPassword.fulfilled]: (state, { payload }) => {
      state.message = payload.message;
      state.loading = false;
      toast.success(state.message);
    },
    [userresetPassword.rejected]: (state, { payload }) => {
      state.message = payload.data.message;
      state.loading = false;
      state.error = payload;
      toast.error(state.message);
    },
    [userdeleteAccount.pending]: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    [userdeleteAccount.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.error = null;
      state.token = null;
      state.role = null;
      state.profile = null;
      localStorage.clear();
      toast.success(state.message);
    },
    [userdeleteAccount.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.error = payload.data.error;
    },
    [signUpMechanic.pending]: (state) => {
      state.profile = null;
      state.token = null;
      state.loading = true;
      state.error = null;
    },
    [signUpMechanic.fulfilled]: (state, { payload }) => {
      state.profile = payload.mechanic;
      state.token = payload.token;
      state.loading = false;
      state.error = null;
      state.role = "mechanic";
      localStorage.setItem("token", payload.token);
    },
    [signUpMechanic.rejected]: (state, { payload }) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = payload.error;
    },
    [signInMechanic.pending]: (state) => {
      state.profile = null;
      state.token = null;
      state.loading = true;
      state.error = null;
    },
    [signInMechanic.fulfilled]: (state, { payload }) => {
      state.profile = payload.mechanic;
      state.token = payload.token;
      state.loading = false;
      state.error = null;
      state.role = "mechanic";
      localStorage.setItem("token", payload.token);
    },
    [signInMechanic.rejected]: (state, { payload }) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = payload.data.error;
      toast.error(state.error);
    },
    [logoutMechanic.fulfilled]: (state) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.role = null;
      localStorage.clear();
    },
    [mechanicdeleteAccount.pending]: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    [mechanicdeleteAccount.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.error = null;
      state.token = null;
      state.role = null;
      state.profile = null;
      localStorage.clear();
      toast.success(state.message);
    },
    [mechanicdeleteAccount.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.error = payload.data.error;
    },
  },
});
