import styled from 'styled-components';

export const Footer = styled.footer`
    display: flex;
    width: 100%;
    height: 85px;
    padding: 0 25px;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    background-color: #fff;
    border-top: 1px solid ${({ theme }) => theme.border};
`;

export const FooterUl = styled.ul`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

