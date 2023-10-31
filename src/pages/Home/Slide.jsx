import React from 'react';
import * as S from './Slide.styled';

const Slide = () => {
    const deskImageUrl = '/images/DeskSetup.jpg';

    return (
        <>
            <S.SlideSection>
                <div>
                    <S.Category $url={deskImageUrl}></S.Category>
                    <S.CateName>책상</S.CateName>
                </div>
                <div>
                    <S.Category $url={deskImageUrl}></S.Category>
                    <S.CateName>의자</S.CateName>
                </div>
                <div>
                    <S.Category $url={deskImageUrl}></S.Category>
                    <S.CateName>모니터</S.CateName>
                </div>
                <div>
                    <S.Category $url={deskImageUrl}></S.Category>
                    <S.CateName>키보드</S.CateName>
                </div>
                <div>
                    <S.Category $url={deskImageUrl}></S.Category>
                    <S.CateName>마우스</S.CateName>
                </div>
                <div>
                    <S.Category $url={deskImageUrl}></S.Category>
                    <S.CateName>스피커</S.CateName>
                </div>
                <div>
                    <S.Category $url={deskImageUrl}></S.Category>
                    <S.CateName>데스크탑</S.CateName>
                </div>
                <div>
                    <S.Category $url={deskImageUrl}></S.Category>
                    <S.CateName>노트북</S.CateName>
                </div>
                <div>
                    <S.Category $url={deskImageUrl}></S.Category>
                    <S.CateName>액세서리</S.CateName>
                </div>
            </S.SlideSection>
        </>
    );
};

export default Slide;
