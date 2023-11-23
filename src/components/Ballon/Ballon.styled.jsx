import styled, { css } from 'styled-components';
import { ReactComponent as Trash } from '../../assets/images/Trash.svg';

export const BallonContainer = styled.div`
    display: none;
`;

export const Ballon = styled.div`
    position: absolute;
    width: 150px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 12px;
    color: #fff;
    box-shadow: 0 5px 6px rgba(0, 0, 0, 0.19);
    background: #f56d25;
    z-index: 101;
    cursor: default;

    div:only-child {
        width: 100%;
    }
`;

export const Arrow = styled.div`
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    left: 0;
    z-index: 105;

    // 화살표 방향 조정
    ${({ $isAbove }) => css`
        border-color: ${$isAbove
            ? '#f56d25 transparent transparent transparent'
            : 'transparent transparent #f56d25 transparent'};
        border-width: 10px 10px 10px 10px;
    `}
`;

export const Product = styled.div`
    width: 90px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }

    div:nth-child(1) {
        padding-bottom: 1px;
        margin-bottom: 5px;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    div:nth-child(2) {
        font-family: 'PreBold';
    }
`;

export const ProductName = styled.div`
    font-weight: 700;
`;

export const TrashIcon = styled(Trash)`
    path {
        fill: #fff;
    }
`;

export const DeleteItemButton = styled.button`
    padding: 0 6px;
`;
