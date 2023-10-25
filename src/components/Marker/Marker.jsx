import React from 'react';
import * as S from './Marker.styled';
import markerImg from '../../assets/images/Marker.svg';

export const Marker = React.forwardRef((props, markerRef) => {
    const { onMouseDown, handleMarkerLoad, markerLocation } = props;
    return (
        <button>
            <S.MarkerPointer
                src={markerImg}
                alt="마커"
                className="marker"
                ref={markerRef}
                onMouseDown={onMouseDown}
                onLoad={handleMarkerLoad}
                style={{
                    left: `${markerLocation.left}%`,
                    top: `${markerLocation.top}%`,
                }}
            />
        </button>
    );
});
