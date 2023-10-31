import React from 'react';
import * as S from './Header.styled';

const Header = () => {
    return (
        <>
            <S.Headbar>
                <S.LogoIcon />
                <S.SearchIcon />
            </S.Headbar>
        </>
    );
};

export default Header;
