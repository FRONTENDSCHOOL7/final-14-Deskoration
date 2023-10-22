import styled from 'styled-components';
import theme from '../../styles/theme';

export const SlideSection = styled.section`
    margin: 0 25px;
`;

export const Item = styled.div`
    display: inline-block;
    width: 45px;
    height: 45px;
    border: 1px solid black;
    border-radius: 50%;
    margin: 0 15px 20px 0;
    &::after {
        content: 'followID';
        display: block;
        position: absolute;
        top: 160px;
        font-size: 12px;
    }
`;
