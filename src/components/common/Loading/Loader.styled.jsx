import styled, { css, keyframes } from 'styled-components';

export const TitleBox = styled.h1`
    font-size: 24px;
    font-weight: 700;
    height: calc(100vh - 162px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const fadeIn = keyframes`
  0% {
    color: ${props => props.theme.main};
  }
  50% {
    color: #eee;
  }
  100% {
    color: ${props => props.theme.main};
  }
`;

export const CharSpan = styled.span`
    color: ${props => props.theme.main};
    ${props =>
        props.$toggleColor &&
        css`
            // fadeIn 애니메이션을 적용합니다.
            // 애니메이션은 총 1.6초 동안 진행되며, props.$delay만큼 지연됩니다.
            // 처음 0.8초 동안은 #eee로 바뀌고, 다음 0.8초 동안은 다시 원래 색상으로 돌아갑니다.
            animation: ${fadeIn} 1.6s ${props.$delay}s;
        `}
`;
