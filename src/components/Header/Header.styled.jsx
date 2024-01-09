import styled from 'styled-components';
import theme from 'styles/theme';

import { ReactComponent as Logo } from 'assets/images/Logo.svg';
import { ReactComponent as Backward } from 'assets/images/Backward.svg';

export const Headbar = styled.header`
    height: 60px;
    color: ${theme.main};
    display: flex;
    align-items: center;
    padding: 0 25px;
    border-bottom: 1px solid ${theme.border};
`;

export const LogoIcon = styled(Logo)`
    height: 30px;
    color: ${theme.main};
`;

export const BackwardIcon = styled(Backward)`
    margin-right: 12px;
`;

export const titleSpan = styled.span`
    font-size: ${theme.fontSize.lg};
    color: ${theme.main};
    font-weight: 700;
`;

export const UserInfo = styled.div`
    width: 100%;
    font-size: ${theme.fontSize.lg};
    font-weight: 700;

    a {
        display: flex;
        align-items: center;
    }

    img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        margin-right: 8px;
        border: 1px solid ${theme.border};
        object-fit: cover;
    }
`;
