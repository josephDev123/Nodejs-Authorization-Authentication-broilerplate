import axios from "axios";
import { getCredential } from "../utils/getCredential";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/",
  withCredentials: true,
});

export const axiosDefault = axios.create({
  baseURL: "http://localhost:7000/",
  withCredentials: true,
});

const { tokenData } = getCredential();
axiosDefault.defaults.headers.common[
  "Authorization"
] = `Bearer  ${tokenData.name}`;
