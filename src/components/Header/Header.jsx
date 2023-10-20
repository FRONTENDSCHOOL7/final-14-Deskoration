import React from 'react';
import * as S from './Header.styled';

const Header = () => {
    return (
        <>
            <S.Headbar>
                <S.Img src="./images/DESKORATION.png" />
                {/* 임시로고 */}
                <span>
                    돋보기아이콘
                    {/* 업로드된 아이콘으로 교체 */}
                </span>
            </S.Headbar>
        </>
    );
};

export default Header;
