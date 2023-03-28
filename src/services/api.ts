import axios from "axios";
import type { AxiosInstance } from "axios";
const api = axios.create({
	baseURL: import.meta.env["VITE_API_BASE_URL"],
});

export type { AxiosInstance };
export default api;
