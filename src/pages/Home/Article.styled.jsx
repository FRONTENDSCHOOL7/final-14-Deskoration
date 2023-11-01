import styled from 'styled-components';
import theme from '../../styles/theme';

export const Section = styled.section`
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    width: 310px;
    height: 575px;
    gap: 10px;
    color: ${theme.mainFont};
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 7px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }

    &::-webkit-scrollbar-track {
        background-color: #f5f5f5;
        border-radius: 10px;
    }
`;

export const Article = styled.article`
    width: 140px;
    height: 140px;
    background-image: url(${props => props.imageurl});
    background-size: cover;
    box-sizing: border-box;
    transition: border 0.1s ease;
    &:hover {
        border: 3px solid ${theme.main};
    }
    border-radius: 20px;
`;
