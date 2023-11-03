import styled from 'styled-components';
import theme from '../../styles/theme';

export const SlideSection = styled.section`
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    white-space: nowrap;
    gap: 15px;
    /* &::-webkit-scrollbar {
        display: none; 
    } */
    &::-webkit-scrollbar {
        /* width: 5px; */
        height: 5px;
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

export const Category = styled.div`
    width: 50px;
    height: 50px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 50%;
    margin-bottom: 8px;

    background-image: url(${({ $url }) => $url});
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
`;

export const CateName = styled.p`
    width: 50px;
    position: relative;
    /* top: %; */
    text-align: center;
    font-size: 10px;
    color: ${({ theme }) => theme.mainFont};
`;
