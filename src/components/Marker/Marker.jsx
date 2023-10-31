import React from 'react';
import * as S from './Marker.styled';
import markerImg from '../../assets/images/Marker.svg';
import Ballon from '../Ballon/Ballon';

export const Marker = React.forwardRef((props, markerRef) => {
    const { onMouseDown, markerLocation, item, deleteItem } = props;

    return (
        <S.MarkerContainer>
            <S.MarkerPointer
                src={markerImg}
                alt="마커"
                className="marker"
                ref={markerRef}
                onMouseDown={onMouseDown}
                $markerLocation={markerLocation}
            />
            {item && <Ballon item={item} deleteItem={deleteItem} />}
        </S.MarkerContainer>
    );
});
