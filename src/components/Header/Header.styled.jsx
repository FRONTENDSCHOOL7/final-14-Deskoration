import styled from 'styled-components';
import { ReactComponent as Search } from '../../assets/images/Search.svg';
import { ReactComponent as Logo } from '../../assets/images/Logo.svg';

export const Headbar = styled.header`
    height: 30px;
    color: ${props => props.theme.main};
    display: flex;
    justify-content: space-between;
    margin: 20px 25px 10px;
`;

export const LogoIcon = styled(Logo)`
    height: 30px;
    color: ${props => props.theme.main};
`;

export const SearchIcon = styled(Search)`
    height: 30px;
`;
