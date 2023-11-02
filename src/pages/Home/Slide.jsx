import React from 'react';
import * as S from './Slide.styled';
import accImg from '../../assets/images/category/acc.jpg';
import chairImg from '../../assets/images/category/chair.jpg';
import deskImg from '../../assets/images/category/desk.jpg';
import desktopImg from '../../assets/images/category/desktop.jpg';
import keyboardImg from '../../assets/images/category/keyboard.jpg';
import monitorImg from '../../assets/images/category/monitor.jpg';
import mouseImg from '../../assets/images/category/mouse.jpg';
import laptopImg from '../../assets/images/category/laptop.jpg';
import speakerImg from '../../assets/images/category/speaker.jpg';

const Slide = () => {
    return (
        <>
            <S.SlideSection>
                <div>
                    <S.Category $url={deskImg}></S.Category>
                    <S.CateName>책상</S.CateName>
                </div>
                <div>
                    <S.Category $url={chairImg}></S.Category>
                    <S.CateName>의자</S.CateName>
                </div>
                <div>
                    <S.Category $url={monitorImg}></S.Category>
                    <S.CateName>모니터</S.CateName>
                </div>
                <div>
                    <S.Category $url={keyboardImg}></S.Category>
                    <S.CateName>키보드</S.CateName>
                </div>
                <div>
                    <S.Category $url={mouseImg}></S.Category>
                    <S.CateName>마우스</S.CateName>
                </div>
                <div>
                    <S.Category $url={speakerImg}></S.Category>
                    <S.CateName>스피커</S.CateName>
                </div>
                <div>
                    <S.Category $url={desktopImg}></S.Category>
                    <S.CateName>데스크탑</S.CateName>
                </div>
                <div>
                    <S.Category $url={laptopImg}></S.Category>
                    <S.CateName>노트북</S.CateName>
                </div>
                <div>
                    <S.Category $url={accImg}></S.Category>
                    <S.CateName>액세서리</S.CateName>
                </div>
            </S.SlideSection>
        </>
    );
};

export default Slide;
