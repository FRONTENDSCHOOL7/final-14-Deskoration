import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Splash from '../../components/Splash/Splash';
import AlertModal from '../../components/AlertModal/AlertModal';

import * as S from './User.styled';
import Logo from '../../assets/images/Logo.svg';
import googleLogo from '../../assets/images/login/Google.png';
import kakaoLogo from '../../assets/images/login/Kakao.png';
import facebookLogo from '../../assets/images/login/Facebook.png';

const User = () => {
    const [isReady, setIsReady] = useState(false);

    const { isOpen } = useSelector(store => store.alertModal);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {!isReady ? (
                <Splash />
            ) : (
                <S.UserContainer>
                    {isOpen && (
                        <AlertModal
                            alert={'이메일 또는 비밀번호가 일치하지 않습니다.'}
                        />
                    )}
                    <S.UserLogo>
                        <img src={Logo} alt="데스코레이션 로고" />
                    </S.UserLogo>

                    <S.UserNav>
                        <ul>
                            <li>
                                <NavLink to="login">로그인</NavLink>
                            </li>
                            <li>
                                <NavLink to="signup">회원가입</NavLink>
                            </li>
                        </ul>
                    </S.UserNav>
                    <S.Content>
                        <Outlet />
                    </S.Content>
                    <S.SocialLoginContainer>
                        <ul>
                            <li>
                                <button type="button">
                                    <img src={googleLogo} alt="구글 로그인" />
                                </button>
                            </li>
                            <li>
                                <button type="button">
                                    <img src={kakaoLogo} alt="카카오 로그인" />
                                </button>
                            </li>
                            <li>
                                <button type="button">
                                    <img
                                        src={facebookLogo}
                                        alt="페이스북 로그인"
                                    />
                                </button>
                            </li>
                        </ul>
                    </S.SocialLoginContainer>
                </S.UserContainer>
            )}
        </>
    );
};

export default User;
