import axios from "axios";
import { ENV_VARIABLES } from "../utlis";

const httpClient = axios.create({
  baseURL: ENV_VARIABLES.BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { httpClient };
