import styled, { css } from 'styled-components';

import { ReactComponent as Trash } from '../../assets/images/Trash.svg';

export const Ballon = styled.div`
    position: absolute;

    top: ${props => props.$markerLocation.y}%;

    transform: translate(-50%, 30px);

    width: 150px;
    padding: 12px;
    border-radius: 10px;
    color: #fff;
    background: pink;

    z-index: 101;
    display: none;

    ${props =>
        props.$markerLocation.x < 27
            ? css`
                  left: 78px;
              `
            : props.$markerLocation.x > 75
            ? css`
                  left: 227px;
              `
            : css`
                  left: ${props => props.$markerLocation.x}%;
              `}

    ${props =>
        props.$markerLocation.y > 50 &&
        css`
            transform: translate(-50%, -75px);
        `}

    ::before {
        content: '';
        position: absolute;
        border-style: solid;
        border-color: pink transparent;
        display: block;
        width: 0;
        z-index: 1;
        left: 50%;

        ${props =>
            props.$markerLocation.y > 50
                ? css`
                      border-width: 15px 15px 0;
                      bottom: -15px;
                  `
                : css`
                      border-width: 0 15px 15px;
                      top: -15px;
                  `}
        ${props =>
            props.$markerLocation.x < 25
                ? css`
                      left: ${props => props.$markerLocation.x + 6}%;
                  `
                : props.$markerLocation.x > 75
                ? css`
                      left: ${props => props.$markerLocation.x - 20}%;
                  `
                : css`
                      transform: translateX(-50%);
                  `}
    }
`;

export const Product = styled.div`
    width: 90px;

    div:nth-child(1) {
        padding-bottom: 1px;
        margin-bottom: 5px;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        cursor: point;
        &:hover {
            border-bottom: 1px solid red;
        }
    }
`;

export const TrashIcon = styled(Trash)``;
export const DeletItemButton = styled.button`
    padding: 0 6px;
`;
