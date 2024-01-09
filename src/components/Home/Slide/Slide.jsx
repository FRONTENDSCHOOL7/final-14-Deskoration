import React, { useState } from 'react';

import * as S from './Slide.styled';
import accImg from 'assets/images/category/acc.jpg';
import chairImg from 'assets/images/category/chair.jpg';
import deskImg from 'assets/images/category/desk.jpg';
import desktopImg from 'assets/images/category/desktop.jpg';
import keyboardImg from 'assets/images/category/keyboard.jpg';
import monitorImg from 'assets/images/category/monitor.jpg';
import mouseImg from 'assets/images/category/mouse.jpg';
import laptopImg from 'assets/images/category/laptop.jpg';
import speakerImg from 'assets/images/category/speaker.jpg';
import homeImg from 'assets/images/category/home.jpg';

const Slide = ({ category }) => {
    const [clickedCategory, setClickedCategory] = useState('All');

    const categories = [
        { name: 'All', image: homeImg },
        { name: '책상', image: deskImg },
        { name: '의자', image: chairImg },
        { name: '모니터', image: monitorImg },
        { name: '키보드', image: keyboardImg },
        { name: '마우스', image: mouseImg },
        { name: '스피커', image: speakerImg },
        { name: '데스크탑', image: desktopImg },
        { name: '노트북', image: laptopImg },
        { name: '액세서리', image: accImg },
    ];

    const categoryClick = cat => {
        setClickedCategory(cat);
        category(cat);
    };
    return (
        <S.SlideSection>
            {categories.map(cat => (
                <button key={cat.name} onClick={() => categoryClick(cat.name)}>
                    <S.Category
                        $url={cat.image}
                        selected={clickedCategory === cat.name}
                    />
                    <S.CateName>{cat.name}</S.CateName>
                </button>
            ))}
        </S.SlideSection>
    );
};

export default Slide;
