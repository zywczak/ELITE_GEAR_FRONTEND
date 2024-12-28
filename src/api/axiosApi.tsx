import axios from "axios";
import { BASE_API_URL } from './const';

const api = axios.create({
    baseURL: BASE_API_URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        if (!(error instanceof Error)) {
            return Promise.reject(new Error("An unknown error occurred during the request."));
        }
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 500) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;