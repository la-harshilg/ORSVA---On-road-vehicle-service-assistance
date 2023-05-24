import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

const baseAPI = axios.create({
  baseURL: baseURL,
});

export const getToken = () =>
  localStorage.getItem("token") ? localStorage.getItem("token") : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const AuthAPI = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: getAuthorizationHeader(),
  },
});

const formAPI = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Users
export const UserRegisterAPI = (data) => formAPI.post("/user/register", data);
export const UserLoginAPI = (data) => baseAPI.post("/user/login", data);
export const UserLogoutAPI = () =>
  AuthAPI.get("/user/logout", {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });
export const UserForgotPassword = (data) =>
  baseAPI.post("/user/forgotpassword", data);

export const UserResetPassword = (resetoken, data) =>
  baseAPI.post(`/user/resetpassword/${resetoken}`, data);

export const GetUserProfile = () =>
  AuthAPI.get("/user/profile", {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const UserDeleteAccount = () =>
  AuthAPI.delete("/user/delete", {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

// Mechanic
export const MechanicRegisterAPI = (data) =>
  formAPI.post("/mechanic/register", data);
export const MechanicLoginAPI = (data) => baseAPI.post("/mechanic/login", data);
export const MechanicLogoutAPI = () =>
  AuthAPI.get("/mechanic/logout", {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const MechanicDeleteAccount = () =>
  AuthAPI.delete("/mechanic/delete", {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

// Vehicles
export const AddVehicleAPI = (data) =>
  AuthAPI.post("/vehicle/add", data, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const GetVehiclesByUserAPI = () =>
  AuthAPI.get("/vehicle/byusers", {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const SelectPrimaryVehicle = (vehicleId) =>
  AuthAPI.post(`vehicle/setprimary/${vehicleId}`, null, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const DeleteVehicleAPI = (vehicleId) =>
  AuthAPI.delete(`/vehicle/delete/${vehicleId}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

// Services
export const AddServiceAPI = (data) =>
  AuthAPI.post("/service/add", data, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const DeleteServiceAPI = (serviceId) =>
  AuthAPI.delete(`/service/delete/${serviceId}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const GetServicesByMechanicsAPI = (page) =>
  AuthAPI.get(`/service/bymechanics?page=${page}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

// Mechanics API

export const GetNearbyMechanics = (location, page) =>
  AuthAPI.get(
    `/mechanic/nearbymechanics?lat=${location.lat}&lng=${location.lng}&page=${page}`,
    {
      headers: {
        Authorization: getAuthorizationHeader(),
      },
    }
  );

export const GetAllMechanics = (page) =>
  AuthAPI.get(`/mechanic/allmechanics?page=${page}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const GetMechServicesAPI = (mechId, page) =>
  AuthAPI.get(`/service/mechservices/${mechId}?page=${page}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

// Requests
export const CreateRequestAPI = (data) =>
  AuthAPI.post("/request/create", data, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const GetRequestsByuser = (page) =>
  AuthAPI.get(`/request/requestsbyuser?page=${page}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const GetRequestById = (requestId) =>
  AuthAPI.get(`/request/requestbyId/${requestId}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const GetMechanicsRequests = (page) =>
  AuthAPI.get(`/request/mechanicsrequests?page=${page}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const GetPendingRequests = (page) =>
  AuthAPI.get(`/request/pendingrequests?page=${page}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const UpdateRequestStatusAPI = (requestId, status) =>
  AuthAPI.post(`/request/updatestatus/${requestId}`, status, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const TotalRequestsAPI = () =>
  AuthAPI.get(`/request/totalrequests`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const WeekWiseRequestsAPI = () =>
  AuthAPI.get(`/request/weekwiserequests`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });
