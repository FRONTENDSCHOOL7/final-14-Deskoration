import { Navigate, Outlet } from 'react-router-dom';
import axiosInstance from '../service/axiosInstance';

const PrivateRoutePage = () => {
    const authenticated =
        axiosInstance.defaults.headers.Authorization !== 'Bearer null';

    return !authenticated ? (
        // 로그아웃 상태라면 PrivateRoutePage 접근 방지
        <Navigate to="/" {...alert('로그인이 필요한 서비스입니다.')} />
    ) : (
        <Outlet />
    );
};

export default PrivateRoutePage;
