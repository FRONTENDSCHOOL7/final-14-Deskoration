import React from 'react';
import * as S from './User.styled';
import { NavLink, Outlet } from 'react-router-dom';

const User = () => {
    return (
        <S.UserContainer>
            <nav>
                <ul>
                    <li>
                        <NavLink to="login">로그인</NavLink>
                    </li>
                    <li>
                        <NavLink to="signup">회원가입</NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />

            <section>
                <ul>
                    <li>
                        <button>구글</button>
                    </li>
                    <li>
                        <button>카카오</button>
                    </li>
                    <li>
                        <button>페북</button>
                    </li>
                </ul>
            </section>
        </S.UserContainer>
    );
};

export default User;
