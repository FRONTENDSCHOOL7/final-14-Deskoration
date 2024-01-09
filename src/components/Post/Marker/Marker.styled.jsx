import styled, { css, keyframes } from 'styled-components';

import { TooltipContainer } from '../Tooltip/Tooltip.styled';

const pulse = keyframes`
    0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

const appear = keyframes`
  0%{
    opacity: 0.5;
  }
  100%{
    opacity: 1;
  }
`;

export const MarkerPointer = styled.img`
    position: absolute;
    z-index: 100;
    padding: 5px;
    width: 30px;
    height: 30px;
    ${props =>
        props.name &&
        css`
            animation: ${pulse} 1.8s infinite;
        `}
`;

export const MarkerContainer = styled.div`
    cursor: pointer;
    &:hover {
        ${TooltipContainer} {
            display: block;
            animation: ${appear} 0.3s;
        }
    }
`;
