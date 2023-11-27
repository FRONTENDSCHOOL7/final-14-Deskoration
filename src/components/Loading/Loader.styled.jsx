import styled, { css } from 'styled-components';

export const TitleBox = styled.h1`
    font-size: 24px;
    font-weight: 700;
    height: calc(100vh - 162px);
    display: flex;
    justify-content: center;
    align-items: center;
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
    transition: color 0.8s;
    ${props =>
        props.$delay &&
        css`
            transition-delay: ${props.$delay}s;
        `}
`;
