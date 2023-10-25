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

export const IconButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 48px;
    margin-bottom: 7px;
    gap: 5px;
    &::before {
        content: '';
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: ${({ theme, $hover, $active }) =>
            $active ? theme.main : $hover ? theme.main : '#fff'};
    }
`;

export const IconName = styled.span`
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme, $hover, $active }) =>
        $active ? theme.main : $hover ? theme.main : theme.mainFont};
`;
