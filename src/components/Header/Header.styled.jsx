import styled from 'styled-components';
import { ReactComponent as Search } from '../../assets/images/Search.svg';
import { ReactComponent as Logo } from '../../assets/images/Logo.svg';
import { ReactComponent as Backward } from '../../assets/images/Backward.svg';

export const Headbar = styled.header`
    height: 30px;
    color: ${props => props.theme.main};
    display: flex;
    align-items: center;
    padding: 0 25px;
`;

export const LogoIcon = styled(Logo)`
    height: 30px;
    color: ${props => props.theme.main};
`;

export const SearchIcon = styled(Search)`
    height: 30px;
`;

export const BackwardIcon = styled(Backward)``;

export const titleSpan = styled.span`
    font-size: ${props => props.theme.fontSize.lg};
    color: ${props => props.theme.main};
    font-weight: 700;
`;
