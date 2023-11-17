import React from 'react';
import Ballon from '../Ballon/Ballon';
import * as S from './Marker.styled';

export const Marker = props => {
    const {
        onMouseDown,
        markerLocation,
        productItem,
        deleteProduct,
        itemCount,
        isDetail,
        markerRef,
        name,
        onClick,
    } = props;

    return (
        <S.MarkerContainer
            ref={markerRef}
            onMouseDown={onMouseDown}
            style={{
                left: `${markerLocation.left}%`,
                top: `${markerLocation.top}%`,
            }}
            name={name}
            onClick={onClick}
        >
            <S.MarkerPointer alt="마커" />
            {productItem && (
                <Ballon
                    productItem={productItem}
                    deleteProduct={deleteProduct}
                    itemCount={itemCount}
                    isDetail={isDetail}
                />
            )}
        </S.MarkerContainer>
    );
};

export default Marker;
