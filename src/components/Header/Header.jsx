import React from 'react';
import * as S from './Header.styled';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };
    const currentPage = useSelector(state => state.pageTitle.currentPage);

    return (
        <>
            <S.Headbar>
                <button type="button" onClick={handleGoBack}>
                    <S.BackwardIcon />
                </button>
                <div>
                    {currentPage.type === 'text' && (
                        <S.titleSpan>{currentPage.value}</S.titleSpan>
                    )}
                    {currentPage.type === 'image' && (
                        <img src={currentPage.value} alt="데스코레이션 로고" />
                    )}
                    {currentPage.type === 'user' && (
                        <S.UserInfo>
                            <img
                                src={currentPage.value}
                                alt=""
                                className="user-img"
                            />
                            <h2>{currentPage.username}</h2>
                        </S.UserInfo>
                    )}
                </div>
                {/* <S.LogoIcon /> */}
                {/* <S.SearchIcon /> */}
            </S.Headbar>
        </>
    );
};

export default Header;
