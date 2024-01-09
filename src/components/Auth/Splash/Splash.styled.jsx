import styled, { keyframes } from 'styled-components';

import bgLoading from 'assets/images/bgLoading.jpg';
import { ReactComponent as Logo } from 'assets/images/Loading.svg';

export const LoadingImg = styled(Logo)`
    aspect-ratio: 94 / 124;
    height: 180px;
    z-index: 1;

    .light {
        fill: var(--light-color, 'none');
    }
`;

export const LogoContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url(${bgLoading});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 80%;
        opacity: 0.28;
    }
`;

export const TitleBox = styled.h1`
    font-size: 24px;
    font-weight: 700;
    margin-top: 10px;
`;

const changeColor = keyframes`
    from{
        color:#eee;
    } to{
        color: #685c53;
    }
`;

export const CharSpan = styled.span`
    z-index: 1;
    color: #eee;
    animation: ${changeColor} 2s ${props => props.$delay}s forwards;
`;
