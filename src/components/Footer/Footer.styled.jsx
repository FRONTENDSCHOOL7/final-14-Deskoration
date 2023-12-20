import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/images/Logo.svg';

export const Footer = styled.nav`
    display: flex;
    width: 100%;
    height: 85px;
    padding: 0 25px;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-top: 1px solid ${({ theme }) => theme.border};

    @media screen and (min-width: 1024px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        position: fixed;
        width: 244px;
        height: 100vh;
        left: 0;
        top: 0;
        border-top: none;
        border-right: 1px solid ${({ theme }) => theme.border};
    }
`;

export const FooterUl = styled.ul`
    display: flex;
    justify-content: space-between;
    width: 100%;

    @media screen and (min-width: 1024px) {
        flex-direction: column;
        gap: 28px;
    }
`;

export const LogoBox = styled.div`
    display: none;
    @media screen and (min-width: 1024px) {
        display: block;
        padding: 40px 0 50px 12px;
    }
`;

export const LogoIcon = styled(Logo)`
    height: 30px;
    color: ${props => props.theme.main};
`;
