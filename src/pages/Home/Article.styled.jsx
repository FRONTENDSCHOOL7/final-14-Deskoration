import styled from 'styled-components';
import theme from '../../styles/theme';
import { ReactComponent as Search } from '../../assets/images/Search.svg';

export const Section = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
    grid-gap: 5px;
    width: 100%;
    max-width: 730px;
    color: ${theme.mainFont};
    overflow-y: auto;
    height: calc(100vh - 246px);
    margin: 0 auto;

    @media screen and (min-width: 1024px) {
        height: calc(100vh - 122px);
    }

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }

    a {
        padding: 10px 5px 5px 5px;
    }
`;

export const Article = styled.article`
    aspect-ratio: 1 / 1;
    max-width: 220px;
    max-height: 220px;
    margin: 0 auto;
    background-image: url(${props => props.src});
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
