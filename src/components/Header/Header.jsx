import React from 'react';
import * as S from './Header.styled';
import { useSelector } from 'react-redux';

const Header = () => {
    const currentPage = useSelector(state => state.page.currentPage);

    return (
        <>
            <S.Headbar>
                <div>
                    {currentPage.type === 'text' && (
                        <span>{currentPage.value}</span>
                    )}
                    {currentPage.type === 'image' && (
                        <img src={currentPage.value} alt="Content" />
                    )}
                </div>
                {/* <S.LogoIcon /> */}
                <S.SearchIcon />
            </S.Headbar>
        </>
    );
};

export default Header;
