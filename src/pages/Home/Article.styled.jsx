import styled from 'styled-components';
import theme from '../../styles/theme';
import { ReactComponent as Search } from '../../assets/images/Search.svg';

export const Section = styled.section`
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;
    color: ${theme.mainFont};
    overflow: auto;
`;

export const Article = styled.article`
    width: 140px;
    height: 140px;
    background-image: url(${props => props.src});
    /* background-image: url(${props =>
        props.imageurl || './images/DeskSetup.jpg'}); */
    background-size: cover;
    border: 1px solid ${props => props.theme.border};
    box-sizing: border-box;
    transition: border 0.1s ease;
    &:hover {
        border: 3px solid ${props => props.theme.main};
    }
    border-radius: 20px;
    margin-top: 10px;
`;

export const SearchButton = styled.button`
    position: absolute;
    width: 30px;
    height: 30px;
    top: 15px;
    right: 25px;
`;

export const SearchIcon = styled(Search)``;
