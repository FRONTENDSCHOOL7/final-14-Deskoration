import styled from 'styled-components';
import theme from '../../styles/theme';

export const SlideSection = styled.section`
    margin: 0 25px;
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    white-space: nowrap;
    gap: 15px;
    &::-webkit-scrollbar {
        display: none; // 웹킷 기반 브라우저에서 스크롤바 숨기기
    }
`;

export const Category = styled.div`
    color: ${theme.subFont};
    width: 45px;
    height: 45px;
    border: 1px solid black;
    border-radius: 50%;
    margin-bottom: 20px;
    /* flex-shrink: 3; */
`;

export const CateName = styled.p`
    width: 45px;
    position: relative;
    top: 100%;
    text-align: center;
    font-size: 10px;
`;
