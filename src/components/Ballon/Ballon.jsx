import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './Ballon.styled';

const Ballon = ({ productItem, deleteProduct }) => {
    // 내 글이 아니고, 수정중이 아니라면 삭제하기 안보이게
    const navigate = useNavigate();

    const editProduct = () => {
        navigate(`/newboard/${productItem.detail.id}`, {
            state: { editProductItem: productItem },
        });
    };

    const calcLeft = markerLocation => {
        if (markerLocation.x < 25) {
            return '0';
        } else if (markerLocation.x > 75) {
            return `calc(100% - 150px)`;
        } else {
            return `calc(${markerLocation.x}% - 75px)`; // 50% of the balloon width
        }
    };

    const calcTop = markerLocation => {
        return markerLocation.y > 48
            ? `calc(${markerLocation.y}% - 75px)` // Adjusted for balloon height
            : `calc(${markerLocation.y}% + 34px)`;
    };

    const calcArrowLeft = markerLocationX => {
        if (markerLocationX < 25) {
            return `${markerLocationX * 2}%`;
        } else if (markerLocationX > 75) {
            return `calc(50% + ${((markerLocationX - 75) / 25) * 50}%)`;
        } else {
            return '50%';
        }
    };

    return (
        <S.Ballon
            $markerLocation={productItem.marker}
            style={{
                left: calcLeft(productItem.marker),
                top: calcTop(productItem.marker),
            }}
        >
            <S.Arrow
                isAbove={productItem.marker.y > 48}
                style={{ left: calcArrowLeft(productItem.marker.x) }}
            />
            <S.Product>
                <div onClick={editProduct}>
                    {productItem.detail.productName}
                </div>
                <div> {productItem.detail.price}</div>
            </S.Product>
            <S.DeletItemButton
                type="button"
                onClick={() => deleteProduct(productItem.detail.id)}
            >
                <S.TrashIcon />
            </S.DeletItemButton>
        </S.Ballon>
    );
};

export default Ballon;
