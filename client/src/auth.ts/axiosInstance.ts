import axios from "axios";
import { getCookie } from "../utils/getCookie";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/",
  withCredentials: true,
});

export const axiosDefault = axios.create({
  baseURL: "http://localhost:7000/",
  withCredentials: true,
});

const cookie = getCookie("token");
axiosDefault.defaults.headers.common["Authorization"] = `Bearer  ${cookie}`;
