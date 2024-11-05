// import axios from "axios"
// import { BASE_API_URL } from './const';

// const api = axios.create({
//     baseURL: BASE_API_URL
// })

// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     },
//     (error) => {
//          if (!(error instanceof Error)) {
//             return Promise.reject(new Error("An unknown error occurred during the request."));
//         }
//         return Promise.reject(error);
//     }
// )

// export default api
import axios from "axios";
import { BASE_API_URL } from './const';

const api = axios.create({
    baseURL: BASE_API_URL
});

// Request interceptor to attach token
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

// Response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check if the error is a 401 Unauthorized error
        if (error.response && error.response.status === 401) {
            // Clear the invalid token and redirect to login
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default api;