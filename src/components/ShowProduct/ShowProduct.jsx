import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

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
                    // 지도 api
                    <div> {productDetail.store}</div>
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
