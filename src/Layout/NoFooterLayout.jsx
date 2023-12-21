import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import * as S from './LayoutStyle.styled';
const NoFooterLayout = () => {
    return (
        <>
            <Header />
            <S.NoFooterMain>
                <S.MainBox>
                    <Outlet />
                </S.MainBox>
            </S.NoFooterMain>
        </>
    );
};

export default NoFooterLayout;
