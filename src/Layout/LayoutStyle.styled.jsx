import styled from 'styled-components';

export const Main = styled.main`
    padding: 15px 25px 0;
    height: calc(100% - 145px);
    overflow: auto;
    @media screen and (min-width: 1024px) {
        position: absolute;
        left: 244px;
        height: 100%;
        width: calc(100% - 244px);
    }
`;

export const HomeMain = styled.main`
    padding: 15px 25px 0;
    height: calc(100% - 145px);

    @media screen and (min-width: 1024px) {
        position: absolute;
        left: 244px;
        height: 100%;
        width: calc(100% - 244px);
    }
`;

export const UserProfileMain = styled.main`
    padding: 15px 25px 0;
    height: calc(100% - 60px);
    overflow: auto;
    @media screen and (min-width: 1024px) {
        position: absolute;
        left: 244px;
        height: 100%;
        width: calc(100% - 244px);
    }
`;
