import React from 'react';
import * as S from './User.styled';
import { NavLink, Outlet } from 'react-router-dom';

const User = () => {
    return (
        <S.UserContainer>
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
                        <button type="button">구글</button>
                    </li>
                    <li>
                        <button type="button">카카오</button>
                    </li>
                    <li>
                        <button type="button">페북</button>
                    </li>
                </ul>
            </S.SocialLoginContainer>
        </S.UserContainer>
    );
};

export default User;
