import React from 'react';
import * as S from './Header.styled';
import logo from '../../assets/images/Logo.svg';
import search from '../../assets/images/Search.svg';

const Header = () => {
    return (
        <>
            <S.Headbar>
                <S.Img src={logo} />
                {/* 임시로고 */}
                <span>
                    <S.Img src={search} />
                    {/* 업로드된 아이콘으로 교체 */}
                </span>
            </S.Headbar>
        </>
    );
};

export default Header;
