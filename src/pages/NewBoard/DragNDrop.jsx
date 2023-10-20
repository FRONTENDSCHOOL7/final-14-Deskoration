import React, { useEffect, useRef, useState } from 'react';

const ShowMarker = React.forwardRef((props, markerRef) => {
    const { onMouseDown, handleMarkerLoad, markerLocation } = props;
    return (
        <>
            <img
                src={`${process.env.PUBLIC_URL}/images/marker.svg`}
                alt="이미지 마커 표시"
                className="marker"
                ref={markerRef}
                onMouseDown={onMouseDown}
                onLoad={handleMarkerLoad}
                style={{
                    position: 'absolute',
                    left: `${markerLocation.left}%`,
                    top: `${markerLocation.top}%`,
                }}
            />
        </>
    );
});

const DragNDrop = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isMarkerLoaded, setIsMarkerLoaded] = useState(false);
    const [containerSize, setContainerSize] = useState({});
    const [markerSize, setMarkerSize] = useState({});
    const [originPosition, setOriginPosition] = useState({});
    const [markerLocation, setMarkerLocation] = useState({
        left: 50,
        top: 50,
    });
    const containerEl = useRef();
    const markerEl = useRef();

    // 이미지와 마커의 크기 가져오기
    useEffect(() => {
        if (isImageLoaded && containerEl.current) {
            const containerRect = containerEl.current.getBoundingClientRect();
            setContainerSize(prev => ({
                ...prev,
                width: containerRect.width,
                height: containerRect.height,
            }));
        }

        if (isMarkerLoaded && markerEl.current) {
            const markerRect = markerEl.current.getBoundingClientRect();
            setMarkerSize(prev => ({
                ...prev,
                width: markerRect.width,
                height: markerRect.height,
            }));
        }
    }, [isClicked, isImageLoaded, isMarkerLoaded]);

    // 클릭 여부 확인
    const handleClick = () => {
        setIsClicked(true);
        return;
    };

    // 마우스다운 함수
    const onMouseDown = event => {
        event.preventDefault();
        setIsDragging(true);
        setOriginPosition(prev => ({
            ...prev,
            x: event.clientX,
            y: event.clientY,
            left: markerEl.current.offsetLeft,
            top: markerEl.current.offsetTop,
        }));
    };

    // document에 마우스업 이벤트 적용
    useEffect(() => {
        const handleDocumentMouseUp = () => {
            setIsDragging(false);
        };
        document.addEventListener('mouseup', handleDocumentMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleDocumentMouseUp);
        };
    }, []);

    // 마우스무브 함수
    const onMouseMove = event => {
        if (isDragging) {
            const diffX = event.clientX - originPosition.x;
            const diffY = event.clientY - originPosition.y;
            // 컨테이너를 초과하지 않도록 x,y의 이동 범위를 제한
            const endPointX = parseFloat(
                ((containerSize.width - markerSize.width) /
                    containerSize.width) *
                    100,
            );
            const endPointY = parseFloat(
                ((containerSize.height - markerSize.height) /
                    containerSize.height) *
                    100,
            );
            // (마커의 위치 /컨테이너 크기) * 100
            const convertLeft = parseFloat(
                (Math.max(0, originPosition.left + diffX) /
                    containerSize.width) *
                    100,
            );
            const convertTop = parseFloat(
                (Math.max(0, originPosition.top + diffY) /
                    containerSize.height) *
                    100,
            );
            setMarkerLocation(prev => ({
                ...prev,
                left: Math.min(convertLeft, endPointX),
                top: Math.min(convertTop, endPointY),
            }));
        }
    };

    // 이미지 로드 함수
    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    // 마커 로드 함수
    const handleMarkerLoad = () => {
        setIsMarkerLoaded(true);
    };

    return (
        <div
            ref={containerEl}
            style={{
                width: 'calc(100% - 60px)',
                margin: '0 auto',
                position: 'relative',
            }}
            onClick={handleClick}
            onMouseMove={onMouseMove}
        >
            <img
                src={`${process.env.PUBLIC_URL}/images/dummyImg.jpg`}
                style={{ width: '100%', display: 'block' }}
                onLoad={handleImageLoad}
            />
            {isClicked && (
                <ShowMarker
                    ref={markerEl}
                    onMouseDown={onMouseDown}
                    handleMarkerLoad={handleMarkerLoad}
                    markerLocation={markerLocation}
                />
            )}
        </div>
    );
};

export default DragNDrop;
