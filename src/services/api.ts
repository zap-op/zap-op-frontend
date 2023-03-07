import axios from "axios";
import type { AxiosInstance } from "axios";
const api = axios.create({
	baseURL: process.env["REACT_APP_BASE_URL"],
});

export type { AxiosInstance };
export default api;
