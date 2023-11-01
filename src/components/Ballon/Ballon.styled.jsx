import styled, { css } from 'styled-components';

import { ReactComponent as Trash } from '../../assets/images/Trash.svg';

export const Ballon = styled.div`
    position: absolute;
    width: 150px;
    height: 60px;
    padding: 12px;
    color: ${props => props.theme.mainFont};
    box-shadow: 0 5px 6px rgba(0, 0, 0, 0.19);
    background: #fff;
    z-index: 101;
    display: none;
`;

export const Arrow = styled.div`
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    left: 50%;

    // 화살표 방향과 위치 조정
    ${({ isAbove }) => css`
        border-color: ${isAbove
            ? '#fff transparent transparent transparent'
            : 'transparent transparent #fff transparent'};
        border-width: 10px 10px 10px 10px;
        ${isAbove ? 'bottom: -20px;' : 'top: -20px;'}
    `}
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
