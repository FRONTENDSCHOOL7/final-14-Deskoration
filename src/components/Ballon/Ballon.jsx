import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as S from './Ballon.styled';

const Ballon = ({ productItem, deleteProduct, itemNumer, isDetail }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const editProduct = () => {
        navigate(`/postUpload/${productItem.detail.id}`, {
            state: { defaultProductItem: productItem },
        });
    };

    const showProduct = itemNumer => {
        navigate(`/detailPost/${id}/${itemNumer}`, {
            state: { defaultProductItem: productItem },
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
                $isAbove={productItem.marker.y > 48}
                style={{ left: calcArrowLeft(productItem.marker.x) }}
            />
            <S.Product>
                <S.ProductName
                    onClick={() => {
                        !isDetail ? editProduct() : showProduct(itemNumer);
                    }}
                >
                    {productItem.detail.productName}
                </S.ProductName>
                <div> {productItem.detail.price}원</div>
            </S.Product>
            {!isDetail && (
                <S.DeletItemButton
                    type="button"
                    onClick={() => deleteProduct(productItem.detail.id)}
                >
                    <S.TrashIcon />
                </S.DeletItemButton>
            )}
        </S.Ballon>
    );
};

export default Ballon;
