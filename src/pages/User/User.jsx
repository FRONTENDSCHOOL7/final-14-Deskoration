import React from 'react';
import * as S from './User.styled';
import Logo from '../../assets/images/Logo.svg';
import googleLogo from '../../assets/images/login/Google.png';
import kakaoLogo from '../../assets/images/login/Kakao.png';
import facebookLogo from '../../assets/images/login/Facebook.png';
import { NavLink, Outlet } from 'react-router-dom';

const User = () => {
    return (
        <S.UserContainer>
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
                            <img src={facebookLogo} alt="페이스북 로그인" />
                        </button>
                    </li>
                </ul>
            </S.SocialLoginContainer>
        </S.UserContainer>
    );
};

export default User;
