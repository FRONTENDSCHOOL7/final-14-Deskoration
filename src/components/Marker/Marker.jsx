import React from 'react';
import markerImg from '../../assets/images/Marker.svg';

export const Marker = React.forwardRef((props, markerRef) => {
    const { onMouseDown, handleMarkerLoad, markerLocation } = props;
    return (
        <button>
            <img
                src={markerImg}
                alt="이미지 마커 표시"
                className="marker"
                ref={markerRef}
                onMouseDown={onMouseDown}
                onLoad={handleMarkerLoad}
                style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    left: `${markerLocation.left}%`,
                    top: `${markerLocation.top}%`,
                }}
            />
        </button>
    );
});
