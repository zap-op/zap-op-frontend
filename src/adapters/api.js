import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8888"
})

export default api;
