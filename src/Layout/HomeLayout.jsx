import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import * as S from './LayoutStyle.styled';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <>
            <Header />
            <S.HomeMain>
                <Outlet />
            </S.HomeMain>
            <Footer />
        </>
    );
};

export default HomeLayout;
