import styled from 'styled-components';
import theme from '../../styles/theme';
import { ReactComponent as Search } from '../../assets/images/Search.svg';

export const Section = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
    width: 100%;
    color: ${theme.mainFont};
    overflow-y: ${props => (props.$isProfile ? null : 'auto')};
    height: calc(100vh - 247px);
    padding: 10px 5px 10px 0;

    @media screen and (min-width: 280px) {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    }

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }
    a {
        aspect-ratio: 1/1;
        max-width: 280px;
        max-height: 280px;
    }
`;

export const Article = styled.article`
    width: 100%;
    height: 100%;
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
