import styled from 'styled-components';
import theme from '../../styles/theme';
import { ReactComponent as Search } from '../../assets/images/Search.svg';

export const Section = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;
    width: 100%;
    gap: 10px;
    color: ${theme.mainFont};
    overflow-y: auto;
    padding: 10px 0px;
    height: calc(100vh - 246px);
`;

export const Article = styled.article`
    width: 145px;
    height: 145px;
    background-image: url(${props => props.src});
    /* background-image: url(${props =>
        props.imageurl || './images/DeskSetup.jpg'}); */
    background-size: cover;
    background-position: center;
    border: 1px solid ${props => props.theme.border};
    box-sizing: border-box;
    transition: border 0.1s ease;
    &:hover {
        border: 3px solid ${props => props.theme.main};
    }
    border-radius: 20px;
`;

export const SearchButton = styled.button`
    position: absolute;
    width: 30px;
    height: 30px;
    top: 15px;
    right: 25px;
`;

export const SearchIcon = styled(Search)``;
