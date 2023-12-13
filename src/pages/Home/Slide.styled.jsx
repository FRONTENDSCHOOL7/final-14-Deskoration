import styled from 'styled-components';
import theme from '../../styles/theme';

export const SlideSection = styled.section`
    padding-bottom: 8px;
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    white-space: nowrap;
    gap: 15px;
`;

export const Category = styled.div`
    width: 54px;
    height: 54px;
    border: ${({ selected, theme }) =>
        selected ? `2px solid ${theme.main}` : `1px solid ${theme.border}`};
    border-radius: 50%;
    margin-bottom: 8px;

    background-image: url(${({ $url }) => $url});
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
`;

export const CateName = styled.p`
    margin: auto;
    width: 50px;
    position: relative;
    text-align: center;
    font-size: 10px;
    color: ${({ theme }) => theme.mainFont};
`;
