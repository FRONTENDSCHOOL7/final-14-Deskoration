import axios from 'axios';

const accessToken = window.sessionStorage.getItem('Token');

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
    },
});

axiosInstance.interceptors.request.use(config => {
    accessToken && (config.headers.Authorization = `Bearer ${accessToken}`);

    return config;
});

export default axiosInstance;
