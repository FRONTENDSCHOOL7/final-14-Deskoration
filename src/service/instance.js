import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(config => {
    const accessToken = window.sessionStorage.getItem('Token');

    accessToken && (config.headers.Authorization = `Bearer ${accessToken}`);

    return config;
});

export default instance;
