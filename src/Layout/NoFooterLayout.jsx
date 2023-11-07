import Header from '../components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import * as S from './LayoutStyle.styled';
const NoFooterLayout = () => {
    const location = useLocation();
    const isUserProfile = location.pathname.includes('/profile/');

    return (
        <>
            <Header />
            {isUserProfile ? (
                <>
                    <S.UserProfileMain>
                        <Outlet />
                    </S.UserProfileMain>
                </>
            ) : (
                <>
                    <S.Main>
                        <Outlet />
                    </S.Main>
                </>
            )}
        </>
    );
};

export default NoFooterLayout;
