import React from 'react';

export const Marker = React.forwardRef((props, markerRef) => {
    const { onMouseDown, handleMarkerLoad, markerLocation } = props;
    return (
        <button>
            <img
                src={`${process.env.PUBLIC_URL}/images/marker.svg`}
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
