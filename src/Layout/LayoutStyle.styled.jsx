import styled from 'styled-components';

export const Main = styled.main`
    padding: 15px 25px;
    height: calc(100% - 145px);
    overflow: ${props => (props.$isHome ? null : 'auto')};
`;

export const NoFooterMain = styled.main`
    padding: 15px 25px;
    height: calc(100% - 60px);
    overflow: auto;
`;
