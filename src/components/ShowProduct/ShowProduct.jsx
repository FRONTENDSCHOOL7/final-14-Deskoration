import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { StaticMap } from 'react-kakao-maps-sdk';

import * as S from './ShowProduct.styled';

const ShowProduct = () => {
    const [isClipboard, setIsClipboard] = useState({
        boolean: null,
        message: '',
    });

    const location = useLocation();
    const product = location.state?.showProduct;
    const productDetail = product?.detail;

    const copyClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setTimeout(() => {
                setIsClipboard({
                    boolean: true,
                    message: '링크가 성공적으로 복사되었습니다.',
                });
            }, 100);
        } catch (err) {
            setTimeout(() => {
                setIsClipboard({
                    boolean: true,
                    message: '링크 복사에 실패했습니다.',
                });
            }, 100);
        }
        setTimeout(() => {
            setIsClipboard(prev => ({ ...prev, boolean: false }));
        }, 1000);
    };

    return (
        <>
            <S.MapContianer>
                {productDetail.link ? (
                    <S.LinkButton $link={productDetail.link}>
                        상품 보러가기
                    </S.LinkButton>
                ) : (
                    <>
                        <StaticMap // 지도를 표시할 Container
                            center={{
                                lat: productDetail.store.position.lat,
                                lng: productDetail.store.position.lng,
                            }}
                            style={{
                                // 지도의 크기
                                width: '100%',
                                height: '300px',
                            }}
                            marker={{
                                lat: productDetail.store.position.lat,
                                lng: productDetail.store.position.lng,
                            }}
                            level={3} // 지도의 확대 레벨
                        />
                        <S.MapBox>
                            <span>{productDetail.store.name}</span>
                            <address>{productDetail.store.address}</address>
                        </S.MapBox>
                    </>
                )}
            </S.MapContianer>
            <S.ProductBox>
                <S.ProductText>
                    <div>{productDetail.productName}</div>
                    <div>
                        <span>구매가</span>
                        <span>
                            {productDetail.price.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ',',
                            )}
                            원
                        </span>
                    </div>
                </S.ProductText>
                <button onClick={copyClipboard}>
                    <S.ShareIcon />
                </button>
                <S.ClipboardMessage $visible={isClipboard?.boolean}>
                    {isClipboard.message}
                </S.ClipboardMessage>
            </S.ProductBox>
        </>
    );
};

export default ShowProduct;
