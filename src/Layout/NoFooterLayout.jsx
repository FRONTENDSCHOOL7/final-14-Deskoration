import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import * as S from './LayoutStyle.styled';
const NoFooterLayout = () => (
    <>
        <Header />
        <S.Main>
            <Outlet />
        </S.Main>
    </>
);

export default NoFooterLayout;
