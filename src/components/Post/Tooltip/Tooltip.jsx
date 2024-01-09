import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as S from './Tooltip.styled';

const Tooltip = ({ productItem, deleteProduct, itemCount, isDetail }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const editProduct = () => {
        navigate(`${productItem.detail.id}`, {
            state: { editProduct: productItem },
        });
    };

    const showProduct = itemCount => {
        navigate(`/detailPost/${id}/${itemCount}`, {
            state: { showProduct: productItem },
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
            ? `calc(${markerLocation.y}% - 70px)` // Adjusted for balloon height
            : `calc(${markerLocation.y}% + 39px)`;
    };

    const calcArrowLeft = markerLocation => {
        return `calc(${markerLocation.x}% + 5px)`;
    };

    const calcArrowTop = markerLocation => {
        if (markerLocation.y > 48) {
            return `calc(${markerLocation.y}% - 10px)`;
        } else {
            return `calc(${markerLocation.y}% + 20px)`;
        }
    };

    return (
        <S.TooltipContainer>
            <S.Arrow
                $isAbove={productItem.marker.y > 48}
                style={{
                    left: calcArrowLeft(productItem.marker),
                    top: calcArrowTop(productItem.marker),
                }}
            />
            <S.Tooltip
                $markerLocation={productItem.marker}
                style={{
                    left: calcLeft(productItem.marker),
                    top: calcTop(productItem.marker),
                }}
            >
                <S.Product
                    onClick={() => {
                        !isDetail ? editProduct() : showProduct(itemCount);
                    }}
                >
                    <S.ProductName>
                        {productItem.detail.productName}
                    </S.ProductName>
                    <div> {productItem.detail.price}원</div>
                </S.Product>
                {!isDetail && (
                    <S.DeleteItemButton
                        type="button"
                        onClick={() => deleteProduct(productItem.detail.id)}
                    >
                        <S.TrashIcon />
                    </S.DeleteItemButton>
                )}
            </S.Tooltip>
        </S.TooltipContainer>
    );
};

export default Tooltip;
