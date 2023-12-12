import React from 'react';
import * as S from './Header.styled';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const myAccountName = sessionStorage.getItem('AccountName');
    const handleGoBack = () => {
        navigate(-1);
    };
    const currentPage = useSelector(state => state.pageTitle.currentPage);

    const isHome = location.pathname.includes('/home');
    const isFeed = location.pathname.includes('/feed');
    const isPostUpload = location.pathname.includes('/postUpload');
    const isChat = /^\/chat\/?$/.test(location.pathname);
    const isMyProfile = /^\/profile\/?$/.test(location.pathname);

    return (
        <>
            <S.Headbar>
                {isHome ||
                isFeed ||
                isPostUpload ||
                isChat ||
                isMyProfile ? null : (
                    <button type="button" onClick={handleGoBack}>
                        <S.BackwardIcon />
                    </button>
                )}

                <div>
                    {currentPage.type === 'text' && (
                        <S.titleSpan>{currentPage.value}</S.titleSpan>
                    )}
                    {currentPage.type === 'image' && (
                        <img src={currentPage.value} alt="데스코레이션 로고" />
                    )}
                    {currentPage.type === 'user' && (
                        <S.UserInfo>
                            <Link
                                to={
                                    currentPage.accountname === myAccountName
                                        ? '/profile'
                                        : `/profile/${currentPage.accountname}`
                                }
                            >
                                <img
                                    src={currentPage.value}
                                    alt=""
                                    className="user-img"
                                />
                            </Link>
                            <h2>{currentPage.username}</h2>
                        </S.UserInfo>
                    )}
                </div>
            </S.Headbar>
        </>
    );
};

export default Header;
