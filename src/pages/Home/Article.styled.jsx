import styled from 'styled-components';

export const Section = styled.section`
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    width: 310px;
    height: 650px;
    gap: 10px;
`;

export const Article = styled.article`
    width: 150px;
    height: 150px;
`;

export const A = styled.a`
    display: inline-block;
    width: 150px;
    height: 150px;
    background-image: url('./images/DeskSetup.jpg');
    background-size: contain;
    background-repeat: no-repeat;
`;
