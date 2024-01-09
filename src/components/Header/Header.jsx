import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useProfileQueryData } from '../../hooks/useQueryData';

import * as S from './Header.styled';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname.includes('/home');
    const isFeed = location.pathname.includes('/feed');
    const isPostUpload = location.pathname.includes('/postUpload');
    const isChat = /^\/chat\/?$/.test(location.pathname);
    const isMyProfile = /^\/profile\/?$/.test(location.pathname);

    const currentPage = useSelector(state => state.pageTitle.currentPage);

    const { data: myAccountName } = useProfileQueryData(isMyProfile);

    const handleGoBack = () => {
        navigate(-1);
    };
    return (
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
                                currentPage.accountname ===
                                myAccountName?.username
                                    ? '/profile'
                                    : `/profile/${currentPage.accountname}`
                            }
                        >
                            <img
                                src={currentPage.value}
                                alt=""
                                className="user-img"
                            />
                            <h2>{currentPage.username}</h2>
                        </Link>
                    </S.UserInfo>
                )}
            </div>
        </S.Headbar>
    );
};

export default Header;
