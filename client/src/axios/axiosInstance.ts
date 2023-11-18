import axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosInstance,
  Axios,
} from "axios";

import { getCredential } from "../utils/getCredential";

const { tokenData } = getCredential();

export const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/",
  withCredentials: true,
});

// Initialize your custom Axios instance
const axiosDefault = axios.create({
  baseURL: "http://localhost:7000/",
  withCredentials: true,
});

axiosDefault.defaults.headers.common[
  "Authorization"
] = `Bearer ${tokenData.name}`;

// Define a function to refresh the token (customize this for your authentication system)
const refreshAccessToken = async () => {
  try {
    // Make an API request to your server to refresh the token
    const response = await axiosDefault.post("/refresh-access-token", {});
    return response.data.newToken; // Assuming your response provides the new token
  } catch (error) {
    throw error; // Handle token refresh failure as needed
  }
};

// Add a request interceptor
axiosDefault.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    // const header = config.headers.Authorization as string;
    // const token = header.split(" ")[1];

    if (!tokenData) {
      window.location.href = "/login";
    } else {
      config.headers.Authorization = `Bearer ${tokenData}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosDefault.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();
      // axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      axiosDefault.defaults.headers.common["Authorization"] =
        "Bearer " + access_token;
      return axiosDefault(originalRequest);
    }
    return Promise.reject(error);
  }
);
