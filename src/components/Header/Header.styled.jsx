import styled from 'styled-components';

import { ReactComponent as Logo } from '../../assets/images/Logo.svg';
import { ReactComponent as Backward } from '../../assets/images/Backward.svg';

export const Headbar = styled.header`
    height: 60px;
    color: ${props => props.theme.main};
    display: flex;
    align-items: center;
    padding: 0 25px;
    border: 1px solid ${props => props.theme.border};
`;

export const LogoIcon = styled(Logo)`
    height: 30px;
    color: ${props => props.theme.main};
`;

export const BackwardIcon = styled(Backward)`
    margin-right: 12px;
`;

export const titleSpan = styled.span`
    font-size: ${props => props.theme.fontSize.lg};
    color: ${props => props.theme.main};
    font-weight: 700;
`;

export const UserInfo = styled.div`
    display: flex;
    width: 100%;
    font-size: ${props => props.theme.fontSize.lg};
    font-weight: 700;
    align-items: center;

    .user-img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        margin-right: 8px;
        border: 1px solid ${props => props.theme.border};
        object-fit: cover;
    }
`;
