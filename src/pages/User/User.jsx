import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import Splash from '../../components/Splash/Splash';
import AlertModal from '../../components/AlertModal/AlertModal';

import * as S from './User.styled';
import Logo from '../../assets/images/Logo.svg';

const User = () => {
    const [isReady, setIsReady] = useState(false);

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
                    <AlertModal />
                </S.UserContainer>
            )}
        </>
    );
};

export default User;
