import styled, { css } from 'styled-components';
import bgLoading from '../../assets/images/bgLoading.jpg';
import { ReactComponent as Logo } from '../../assets/images/Loading.svg';

export const LoadingImg = styled(Logo)`
    aspect-ratio: 94 / 124;
    height: 180px;

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

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url(${bgLoading});
        background-repeat: no-repeat;
        background-size: fill;
        background-position: 80%;
        opacity: 0.28;
        z-index: -1;
    }
`;

export const TitleBox = styled.h1`
    font-size: 24px;
    font-weight: 700;
    margin-top: 10px;
`;

export const CharSpan = styled.span`
    ${props =>
        props.$toggleColor
            ? css`
                  color: #eee;
              `
            : css`
                  color: ${props => props.theme.main};
              `}
    transition: color 1.5s;
    ${props =>
        props.$delay &&
        css`
            transition-delay: ${props.$delay}s;
        `}
`;
