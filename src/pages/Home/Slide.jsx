import React from 'react';
import * as S from './Slide.styled';

const Slide = () => {
    return (
        <>
            <S.SlideSection>
                <S.Category>
                    <S.CateName>책상</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>의자</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>모니터</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>키보드</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>마우스</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>스피커</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>데스크탑</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>노트북</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>액세서리</S.CateName>
                </S.Category>
            </S.SlideSection>
        </>
    );
};

export default Slide;
