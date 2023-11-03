import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UploadImg } from '../../service/img_service';
import imageCompression from 'browser-image-compression';

import { Marker } from '../../components/Marker/Marker';

import * as S from './PostUploadForm.styled';

const PostUploadForm = ({
    productItems,
    setProductItems,
    setOffset,
    imageURL,
    setImageURL,
    setImageFile,
    message,
    deleteProduct,
}) => {
    const navigate = useNavigate();

    const hiddenFileInput = useRef(null);

    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [containerSize, setContainerSize] = useState({});
    const [isDragging, setIsDragging] = useState(false);
    const [originPosition, setOriginPosition] = useState({});
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
    const [markerSize] = useState({ width: 20, height: 20 });
    const [markerLocation, setMarkerLocation] = useState({
        left: 50,
        top: 50,
    });
    const markerRefs = useRef([]);
    const containerEl = useRef();

    const handleInputClick = event => {
        event.preventDefault();
        hiddenFileInput.current.click();
    };

    const handleUploadImg = async event => {
        const regex = new RegExp(/(.png|.jpg|.jpeg|.gif|.tif|.heic|bmp)/);

        const file = event.target.files[0];
        if (!file) return;

        const options = {
            maxSizeMB: 5,
        };
        const fileTypeOptions = { ...options, fileType: 'image/jpeg' };

        try {
            const compressedBlob = await imageCompression(
                file,
                regex.test(file) ? options : fileTypeOptions,
            );
            const compressedFile = new File(
                [compressedBlob],
                regex.test(file)
                    ? compressedBlob.name
                    : compressedBlob.name.split('.')[0] + '.jpeg',
                {
                    type: compressedBlob.type,
                },
            );
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
                const imgData = new FormData();
                imgData.append('image', compressedFile);
                UploadImg(imgData, setImageFile);
                setImageURL(reader.result);
            };
            setProductItems([]);
            setIsImageLoaded(false);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteFile = () => {
        // 추후 컨펌 모달로 변경
        if (window.confirm('삭제하시겠습니까?')) {
            setImageURL('');
            setProductItems([]);
            setIsImageLoaded(false);
        }
    };

    const checkProductsCount = () => {
        productItems.length < 5
            ? navigate(`/newboard/${productItems.length}`, {
                  state: { message: message },
              })
            : alert('상품은 최대 5개까지 추가할 수 있습니다.');
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
                left: 50 - (markerSize.width / (2 * containerSize.width)) * 100,
                top:
                    50 - (markerSize.height / (2 * containerSize.height)) * 100,
            }));
        }
    }, [isImageLoaded, containerSize, markerSize.width, markerSize.height]);

    // 드래그 상태가 아닐 때(registerForm으로 넘어가는 클릭일 경우)
    // 클릭한 좌표를 저장 & 아이템 카운트 체크
    const handleImageClick = event => {
        if (!isDragging) {
            const offsetX =
                (event.nativeEvent.offsetX / containerSize.width) * 100;
            const offsetY =
                (event.nativeEvent.offsetY / containerSize.height) * 100;

            setOffset(prev => ({
                ...prev,
                x: offsetX,
                y: offsetY,
            }));

            setMarkerLocation(prev => ({
                ...prev,
                left: offsetX,
                top: offsetY,
            }));

            checkProductsCount();
        }
    };

    // 마우스다운 함수
    const onMouseDown = (event, index) => {
        event.preventDefault();
        setIsDragging(true);

        const currentMarker = markerRefs.current[index];

        setOriginPosition(prev => ({
            ...prev,
            x: event.clientX,
            y: event.clientY,
            left: currentMarker ? currentMarker.offsetLeft : 0,
            top: currentMarker ? currentMarker.offsetTop : 0,
        }));
        setSelectedMarkerIndex(index);
    };

    // 마우스무드레그 함수
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
            const newLeft = parseFloat(
                (Math.max(0, originPosition.left + diffX) /
                    containerSize.width) *
                    100,
            );
            const newTop = parseFloat(
                (Math.max(0, originPosition.top + diffY) /
                    containerSize.height) *
                    100,
            );

            if (selectedMarkerIndex !== null) {
                // products 배열의 불변성을 유지하면서 업데이트
                const updatedProductItems = [...productItems];
                updatedProductItems[selectedMarkerIndex].marker = {
                    x: Math.min(newLeft, endPointX),
                    y: Math.min(newTop, endPointY),
                };
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
            <S.NewBoardFileContainer
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
                            src={imageURL}
                            alt="imageURL"
                            onLoad={handleImageLoad}
                            onClick={handleImageClick}
                        />

                        {productItems.length === 0 ? (
                            <Marker
                                ref={ref => (markerRefs.current[0] = ref)} // 첫 마커를 참조 배열의 첫 번째 위치에 저장
                                markerLocation={markerLocation}
                                name="initialMarker"
                            />
                        ) : (
                            productItems.map((item, index) => (
                                <Marker
                                    key={index}
                                    ref={ref =>
                                        (markerRefs.current[index] = ref)
                                    }
                                    onMouseDown={e => onMouseDown(e, index)}
                                    markerLocation={{
                                        left: item.marker.x,
                                        top: item.marker.y,
                                    }}
                                    productItem={item}
                                    deleteProduct={deleteProduct}
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
            </S.NewBoardFileContainer>

            {imageURL && (
                <S.ExplainTagP>원하는 위치에 상품을 등록하세요.</S.ExplainTagP>
            )}
        </>
    );
};

export default PostUploadForm;
