import React from 'react';
import Ballon from '../Ballon/Ballon';
import * as S from './Marker.styled';
import markerImg from '../../assets/images/Marker.svg';

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
        <S.MarkerContainer>
            <S.MarkerPointer
                src={markerImg}
                alt="마커"
                ref={markerRef}
                onMouseDown={onMouseDown}
                style={{
                    left: `${markerLocation.left}%`,
                    top: `${markerLocation.top}%`,
                }}
                name={name}
                onClick={onClick}
            />
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
