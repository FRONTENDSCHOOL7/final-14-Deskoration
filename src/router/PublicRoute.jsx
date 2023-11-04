import { Navigate } from 'react-router-dom';

const PublicRoutePage = ({ component: Component }) => {
    const authenticated = localStorage.getItem('token');

    return authenticated ? (
        // 로그인 상태라면 PublicRoutePage 접근 방지
        Component
    ) : (
        <Navigate to="/home" />
    );
};

export default PublicRoutePage;
