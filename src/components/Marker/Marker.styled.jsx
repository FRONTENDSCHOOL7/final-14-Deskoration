import styled, { css, keyframes } from 'styled-components';
import { ReactComponent as markerIcon } from '../../assets/images/Marker.svg';
import { Ballon } from '../Ballon/Ballon.styled';

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

export const MarkerPointer = styled(markerIcon)`
    width: 20px;
    height: 20px;
`;

export const MarkerContainer = styled.div`
    position: absolute;
    z-index: 100;
    padding: 5px;
    ${props =>
        props.name &&
        css`
            animation: ${pulse} 1.8s infinite;
        `}

    cursor: pointer;
    &:hover {
        ${Ballon} {
            display: flex;
            justify-content: space-between;
        }
    }
`;
