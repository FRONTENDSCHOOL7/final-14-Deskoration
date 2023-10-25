import React from 'react';
import * as S from './Slide.styled';

const Slide = () => {
    return (
        <>
            <S.SlideSection>
                <S.Category>
                    <S.CateName>Desk</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>Chair</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>Monitor</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>Keyboard</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>Mouse</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>Speaker</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>DeskTop</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>NoteBook</S.CateName>
                </S.Category>
                <S.Category>
                    <S.CateName>Accessory</S.CateName>
                </S.Category>
            </S.SlideSection>
        </>
    );
};

export default Slide;
