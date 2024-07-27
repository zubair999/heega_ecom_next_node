import axios from "axios";
import { getToken } from "./get-token";

const http = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 30000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
});

// Change request data/error here
// http.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     config.headers = {
//       ...config.headers,
//       Authorization: `Bearer ${token ? token : ""}`,
//     };
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// http.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     config.headers = {
//       ...config.headers,
//       // Authorization: `Bearer ${token ? token : ""}`,
//     };
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default http;
