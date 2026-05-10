import axiosInstance from "./axiosInstance";
import { store } from "../app/store";
import { logout } from "../features/auth/authSlice";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url?.includes('/auth/refresh')) {
            store.dispatch(logout());
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }).catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await axiosInstance.get('/api/auth/refresh');
                const newToken = res.data.accessToken;
                localStorage.setItem('accessToken', newToken);
                processQueue(null, newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                store.dispatch(logout());
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;