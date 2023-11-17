import React from 'react';
import Ballon from '../Ballon/Ballon';
import * as S from './Marker.styled';
import markerImg from '../../assets/images/Marker.svg';

export const Marker = React.forwardRef((props, markerRef) => {
    const {
        onMouseDown,
        markerLocation,
        productItem,
        deleteProduct,
        itemNumer,
        isDetail,
    } = props;

    return (
        <S.MarkerContainer>
            <S.MarkerPointer
                src={markerImg}
                alt="마커"
                className="marker"
                ref={markerRef}
                onMouseDown={onMouseDown}
                style={{
                    left: `${markerLocation.left}%`,
                    top: `${markerLocation.top}%`,
                }}
            />
            {productItem && (
                <Ballon
                    productItem={productItem}
                    deleteProduct={deleteProduct}
                    itemNumer={itemNumer}
                    isDetail={isDetail}
                />
            )}
        </S.MarkerContainer>
    );
});

export default Marker;
