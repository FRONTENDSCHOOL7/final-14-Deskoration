import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import * as S from './LayoutStyle.styled';
import { Outlet, useLocation } from 'react-router-dom';

const DefaultLayout = () => {
    const location = useLocation();

    const isDetailPost = location.pathname.includes('/detailpost/');
    const isChatRoom = location.pathname.includes('/chat/');
    const isHome = location.pathname.includes('/home');

    return (
        <>
            <Header />
            <S.Main $isHome={isHome}>
                <Outlet />
            </S.Main>
            {isDetailPost ? null : isChatRoom ? null : <Footer />}
        </>
    );
};

export default DefaultLayout;
