import styled from 'styled-components';

export const Footer = styled.footer`
    display: flex;
    width: 100%;
    height: 90px;
    padding: 0 25px;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    background-color: #fff;
    border-top: 1px solid ${({ theme }) => theme.border};
`;

export const IconButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 8px;
    min-width: 48px;
`;

export const IconName = styled.span`
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme, $hover }) => ($hover ? theme.main : theme.mainFont)};
`;
