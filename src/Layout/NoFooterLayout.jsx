import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import * as S from './LayoutStyle.styled';
const NoFooterLayout = () => {
    return (
        <>
            <Header />
            <S.NoFooterMain>
                <Outlet />
            </S.NoFooterMain>
        </>
    );
};

export default NoFooterLayout;
