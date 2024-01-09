import styled from 'styled-components';
import theme from 'styles/theme';

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

    @media screen and (min-width: 600px) {
        grid-template-columns: repeat(3, 1fr);
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
    border: 1px solid ${theme.border};
    box-sizing: border-box;
    transition: border 0.1s ease;
    &:hover {
        border: 3px solid ${theme.main};
    }
    border-radius: 20px;
`;
