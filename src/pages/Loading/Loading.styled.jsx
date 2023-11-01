import styled, { css } from 'styled-components';
import { ReactComponent as Logo } from '../../assets/images/Loading.svg';

export const LogoContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const LoadingImg = styled(Logo)`
    aspect-ratio: 94 / 124;
    height: 180px;

    .custom-fill {
        fill: none;
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
                  color: #fff;
              `
            : css`
                  color: ${props => props.theme.logo};
              `}
    transition: color 1.5s;
    ${props =>
        props.$delay &&
        css`
            transition-delay: ${props.$delay}s;
        `}
`;
