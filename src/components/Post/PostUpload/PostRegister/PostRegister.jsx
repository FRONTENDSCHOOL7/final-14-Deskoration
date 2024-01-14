import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { openAlertModal } from 'features/modal/alertModalSlice';

import { useImgUpload } from 'hooks/useImgUpload';
import Marker from 'components/Post/Marker/Marker';
import AlertModal from 'components/common/AlertModal/AlertModal';

import * as S from './PostRegister.styled.';

const PostRegister = ({
    productItems,
    setProductItems,
    setOffset,
    imageURL,
    setImageURL,
    setImageFile,
    deleteProduct,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentPath = window.location.pathname;
    const location = useLocation();
    const postData = location.state?.postData;

    const markerPadding = 5;

    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [containerSize, setContainerSize] = useState({});
    const [isDragging, setIsDragging] = useState(false);
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
    const [markerSize] = useState({ width: 30, height: 30 });
    const [markerLocation, setMarkerLocation] = useState({
        left: 50,
        top: 50,
    });
    const [originPosition, setOriginPosition] = useState({
        clientX: 0,
        clientY: 0,
        left: 0,
        right: 0,
    });
    const markerRefs = useRef([]);
    const containerEl = useRef();
    const hiddenFileInput = useRef(null);

    const handleInputClick = event => {
        event.preventDefault();
        hiddenFileInput.current.click();
    };

    const handleUploadImg = useImgUpload(
        setImageFile,
        setImageURL,
        setProductItems,
        setIsImageLoaded,
    );

    const deleteFile = () => {
        setImageURL('');
        setProductItems([]);
        setIsImageLoaded(false);
    };

    const checkProductsCount = () => {
        if (currentPath.includes('/postEdit')) {
            productItems.length < 5
                ? navigate(`/postEdit/${postData.id}/${productItems.length}`)
                : dispatch(
                      openAlertModal('상품은 최대 5개까지 추가할 수 있습니다.'),
                  );
        } else if (currentPath.includes('/postUpload')) {
            productItems.length < 5
                ? navigate(`/postUpload/${productItems.length}`)
                : dispatch(
                      openAlertModal('상품은 최대 5개까지 추가할 수 있습니다.'),
                  );
        }
    };

    // 이미지 로드 함수
    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };
    // 이미지 크기 가져오기
    useEffect(() => {
        if (isImageLoaded && containerEl.current) {
            const containerRect = containerEl.current.getBoundingClientRect();
            setContainerSize(prev => ({
                ...prev,
                width: containerRect.width,
                height: containerRect.height,
            }));
        }
    }, [isImageLoaded]);

    // 로드 시 마커를 가운데로 이동
    useEffect(() => {
        if (isImageLoaded && Object.keys(containerSize).length !== 0) {
            setMarkerLocation(prev => ({
                ...prev,
                left: 50 - (markerSize.width / containerSize.width) * 50,
                top: 50 - (markerSize.height / containerSize.height) * 50,
            }));
        }
    }, [isImageLoaded, containerSize, markerSize.width, markerSize.height]);

    // 드래그 상태가 아닐 때(registerForm으로 넘어가는 클릭일 경우)
    // 상품 등록 후 클릭한 위치에 마커를 띄우기 위해 클릭한 좌표를 저장한다.
    // 아이템 카운트를 체크한다.
    const handleImageClick = event => {
        if (isDragging) return;

        const { alt: target } = event.target;
        let offsetX, offsetY;

        if (target === '마커') {
            ({ left: offsetX, top: offsetY } = markerLocation);
        } else {
            const calcOffset = (offset, size) => (offset / size) * 100;
            const clickOffsetX = calcOffset(
                event.nativeEvent.offsetX,
                containerSize.width,
            );
            const clickOffsetY = calcOffset(
                event.nativeEvent.offsetY,
                containerSize.height,
            );

            const halfOfMarkerSize = 15;
            const markerOffsetX = calcOffset(
                halfOfMarkerSize,
                containerSize.width,
            );
            const markerOffsetY = calcOffset(
                halfOfMarkerSize,
                containerSize.height,
            );

            offsetX = clickOffsetX - markerOffsetX;
            offsetY = clickOffsetY - markerOffsetY;
        }

        setOffset(prev => ({ ...prev, x: offsetX, y: offsetY }));
        setMarkerLocation(prev => ({ ...prev, left: offsetX, top: offsetY }));

        checkProductsCount();
    };

    // 마우스다운 함수
    // 마우스다운 이벤트 발생 시 마커의 원위치를 저장한다.
    const onMouseDown = (event, index) => {
        event.preventDefault();
        setIsDragging(true);

        const currentMarker = markerRefs.current[index];

        setOriginPosition(prev => ({
            ...prev,
            clientX: event.clientX,
            clientY: event.clientY,
            left: currentMarker ? currentMarker.offsetLeft : 0,
            top: currentMarker ? currentMarker.offsetTop : 0,
        }));
        setSelectedMarkerIndex(index);
    };

    // 요소가 움직일 수 있는 최대 한계를 계산한다.
    // 마커가 컨테이너의 오른쪽 혹은 아래쪽의 경계를 넘지 않도록 한다.
    const calcEndPoint = (containerSize, markerSize) => {
        return parseFloat(
            ((containerSize - markerSize + markerPadding) / containerSize) *
                100,
        );
    };

    // 컨테이너 내에서 마커의 새 위치를 계산한다.
    // 마커가 컨테이너의 왼쪽 혹은 위쪽의 경계를 넘지 않도록 한다.
    const calcMarkerPosition = (position, containerSize) => {
        return parseFloat(
            (Math.max(-markerPadding, position) / containerSize) * 100,
        );
    };

    // 드래그 동작 중 마커의 실제 움직임을 처리한다.
    // 마커가 컨테이너의 경계를 넘지 않도록 제한한다.
    const calcNewMarkerPosition = event => {
        const diffX = event.clientX - originPosition.clientX;
        const diffY = event.clientY - originPosition.clientY;
        const endPointX = calcEndPoint(containerSize.width, markerSize.width);
        const endPointY = calcEndPoint(containerSize.height, markerSize.height);

        const newLeft = calcMarkerPosition(
            originPosition.left + diffX,
            containerSize.width,
        );
        const newTop = calcMarkerPosition(
            originPosition.top + diffY,
            containerSize.height,
        );

        return {
            x: Math.min(newLeft, endPointX),
            y: Math.min(newTop, endPointY),
        };
    };

    // 드래그 함수
    const onMouseMove = event => {
        if (isDragging) {
            const newMarkerPostion = calcNewMarkerPosition(event);

            if (selectedMarkerIndex !== null) {
                // products 배열의 불변성을 유지하면서 업데이트
                const updatedProductItems = [...productItems];
                updatedProductItems[selectedMarkerIndex].marker =
                    newMarkerPostion;
                setProductItems(updatedProductItems); // 상위 컴포넌트에서 받은 setProductItems 함수로 업데이트
            }
        }
    };

    // 드레그 후 마우스업 이벤트 적용
    useEffect(() => {
        const handleDocumentMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mouseup', handleDocumentMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleDocumentMouseUp);
        };
    }, []);

    return (
        <>
            <S.NewPostontainer
                $hasPhoto={imageURL}
                ref={containerEl}
                onMouseMove={onMouseMove}
            >
                <input
                    type="file"
                    onChange={handleUploadImg}
                    ref={hiddenFileInput}
                />
                {imageURL ? (
                    <>
                        <img
                            style={{ cursor: 'cell' }}
                            src={imageURL}
                            alt="imageURL"
                            onLoad={handleImageLoad}
                            onClick={handleImageClick}
                        />

                        {productItems.length === 0 ? (
                            <Marker
                                markerRef={ref => (markerRefs.current[0] = ref)} // 첫 마커를 참조 배열의 첫 번째 위치에 저장
                                markerLocation={markerLocation}
                                name={'initialMarker'}
                                onClick={handleImageClick}
                            />
                        ) : (
                            productItems.map((item, index) => (
                                <Marker
                                    key={index}
                                    markerRef={ref =>
                                        (markerRefs.current[index] = ref)
                                    }
                                    onMouseDown={e => onMouseDown(e, index)}
                                    markerLocation={{
                                        left: item.marker.x,
                                        top: item.marker.y,
                                    }}
                                    productItem={item}
                                    deleteProduct={deleteProduct}
                                    isEditing={true}
                                />
                            ))
                        )}

                        <S.ImgControlBox>
                            <S.FileInputButton
                                type="button"
                                onClick={handleInputClick}
                            >
                                <S.ChangeIcon />
                            </S.FileInputButton>
                            <S.FileInputButton
                                type="button"
                                onClick={deleteFile}
                            >
                                <S.DeleteIcon />
                            </S.FileInputButton>
                        </S.ImgControlBox>
                    </>
                ) : (
                    <S.FileInputButton
                        type="button"
                        onClick={handleInputClick}
                        $add
                    >
                        <S.AddIcon />
                    </S.FileInputButton>
                )}
            </S.NewPostontainer>

            {imageURL && (
                <S.ExplainTagP>
                    원하는 위치를 클릭하여 상품을 등록하세요.
                </S.ExplainTagP>
            )}

            <AlertModal />
        </>
    );
};

export default PostRegister;
