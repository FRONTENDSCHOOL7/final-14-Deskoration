import styled, { css } from 'styled-components';

import { ReactComponent as Trash } from '../../assets/images/Trash.svg';

export const Ballon = styled.div`
    position: absolute;
    top: ${props => `calc(${props.$markerLocation.y}% + 34px)`};

    width: 150px;
    height: 60px;
    padding: 12px;
    color: ${props => props.theme.mainFont};
    box-shadow: 0 5px 6px rgba(0, 0, 0, 0.19);
    background: #fff;
    z-index: 101;

    display: none;

    ${props =>
        props.$markerLocation.x < 25
            ? css`
                  left: 0;
                  transform: none;
              `
            : props.$markerLocation.x > 75
            ? css`
                  left: calc(100% - 150px);
              `
            : css`
                  left: ${props => props.$markerLocation.x}%;
                  transform: translateX(-50%);
              `}

    ${props =>
        props.$markerLocation.y > 48 &&
        css`
            top: ${props => `calc(${props.$markerLocation.y}% - 75px)`};
        `}

    &::before {
        content: '';
        position: absolute;
        border-style: solid;
        border-color: #fff transparent;
        display: block;
        z-index: 200;

        ${props =>
            props.$markerLocation.x < 25
                ? css`
                      left: ${props => props.$markerLocation.x * 2}%;
                  `
                : props.$markerLocation.x > 75
                ? css`
                      left: calc(
                          50% + ${((props.$markerLocation.x - 75) / 25) * 50}%
                      );
                  `
                : css`
                      left: 50%;
                  `}

        ${props =>
            props.$markerLocation.y > 48
                ? css`
                      border-width: 10px 10px 0;
                      bottom: -10px;
                  `
                : css`
                      border-width: 0 10px 10px;
                      top: -10px;
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

export const TrashIcon = styled(Trash)`
    path {
        fill: ${props => props.theme.subFont};
    }
`;

export const DeletItemButton = styled.button`
    padding: 0 6px;
`;
