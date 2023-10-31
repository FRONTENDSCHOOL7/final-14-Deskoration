import styled from 'styled-components';

import { Ballon } from '../Ballon/Ballon.styled';

export const MarkerPointer = styled.img`
    position: absolute;
    top: ${props => props.$markerLocation.top}%;
    left: ${props => props.$markerLocation.left}%;

    z-index: 100;

    &.marker {
        width: 20px;
        height: 20px;
    }
`;

export const MarkerContainer = styled.div`
    &:hover {
        ${Ballon} {
            display: flex;
            justify-content: space-between;
        }
    }
`;
