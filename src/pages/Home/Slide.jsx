import React from 'react';
import { useState } from 'react';
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
import homeImg from '../../assets/images/category/home.jpg';

const Slide = ({ category }) => {
    const [clickedCategory, setClickedCategory] = useState('All');

    const categoryClick = cat => {
        setClickedCategory(cat);
        category(cat);
    };
    return (
        <>
            <S.SlideSection>
                <button onClick={() => categoryClick('All')}>
                    <S.Category
                        $url={homeImg}
                        selected={clickedCategory === 'All'}
                    ></S.Category>
                    <S.CateName>ALL</S.CateName>
                </button>
                <button onClick={() => categoryClick('책상')}>
                    <S.Category
                        $url={deskImg}
                        selected={clickedCategory === '책상'}
                    ></S.Category>
                    <S.CateName>책상</S.CateName>
                </button>
                <button onClick={() => categoryClick('의자')}>
                    <S.Category
                        $url={chairImg}
                        selected={clickedCategory === '의자'}
                    ></S.Category>
                    <S.CateName>의자</S.CateName>
                </button>
                <button onClick={() => categoryClick('모니터')}>
                    <S.Category
                        $url={monitorImg}
                        selected={clickedCategory === '모니터'}
                    ></S.Category>
                    <S.CateName>모니터</S.CateName>
                </button>
                <button onClick={() => categoryClick('키보드')}>
                    <S.Category
                        $url={keyboardImg}
                        selected={clickedCategory === '키보드'}
                    ></S.Category>
                    <S.CateName>키보드</S.CateName>
                </button>
                <button onClick={() => categoryClick('마우스')}>
                    <S.Category
                        $url={mouseImg}
                        selected={clickedCategory === '마우스'}
                    ></S.Category>
                    <S.CateName>마우스</S.CateName>
                </button>
                <button onClick={() => categoryClick('스피커')}>
                    <S.Category
                        $url={speakerImg}
                        selected={clickedCategory === '스피커'}
                    ></S.Category>
                    <S.CateName>스피커</S.CateName>
                </button>
                <button onClick={() => categoryClick('데스크탑')}>
                    <S.Category
                        $url={desktopImg}
                        selected={clickedCategory === '데스크탑'}
                    ></S.Category>
                    <S.CateName>데스크탑</S.CateName>
                </button>
                <button onClick={() => categoryClick('노트북')}>
                    <S.Category
                        $url={laptopImg}
                        selected={clickedCategory === '노트북'}
                    ></S.Category>
                    <S.CateName>노트북</S.CateName>
                </button>
                <button onClick={() => categoryClick('액세서리')}>
                    <S.Category
                        $url={accImg}
                        selected={clickedCategory === '액세서리'}
                    ></S.Category>
                    <S.CateName>액세서리</S.CateName>
                </button>
            </S.SlideSection>
        </>
    );
};

export default Slide;
