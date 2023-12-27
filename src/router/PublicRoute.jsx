import { Navigate, Outlet } from 'react-router-dom';
import axiosInstance from '../service/axiosInstance';

const PublicRoutePage = () => {
    const authenticated =
        axiosInstance.defaults.headers.Authorization !== 'Bearer null';

    return authenticated ? (
        // 로그인 상태라면 PublicRoutePage 접근 방지
        <Navigate to="/home" />
    ) : (
        <Outlet />
    );
};

export default PublicRoutePage;
