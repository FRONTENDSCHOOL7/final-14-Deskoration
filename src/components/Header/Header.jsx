import React, { useEffect } from 'react';
import * as S from './Header.styled';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const myacountName = sessionStorage.getItem('tempAccountName');
    const handleGoBack = () => {
        navigate(-1);
    };
    const currentPage = useSelector(state => state.pageTitle.currentPage);

    const isHome = location.pathname.includes('/home');
    const isFeed = location.pathname.includes('/feed');
    const isNewBoard = location.pathname.includes('/newboard');
    const isChat = /^\/chat\/?$/.test(location.pathname);
    const isMyProfile = location.pathname.includes('/profile');
    const isUserProfile = location.pathname.includes('/userProfile');

    // useEffect(() => {
    //     console.log(currentPage);
    // });

    return (
        <>
            <S.Headbar>
                {isHome ||
                isFeed ||
                isNewBoard ||
                isChat ||
                isMyProfile ||
                isUserProfile ? null : (
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
                                    currentPage.accountname === myacountName
                                        ? '/profile'
                                        : `/userprofile/${currentPage.accountname}`
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
