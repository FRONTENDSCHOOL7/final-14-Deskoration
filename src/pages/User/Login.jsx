import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authLoginApi } from '../../service/auth_service';

import { openAlertModal } from '../../features/modal/alertModalSlice';

import GradientButton from '../../components/GradientButton/GradientButton';
import { Input } from '../../components/Input/Input';
import { WarningMsg } from '../../components/Input/WarningMsg';

import * as S from './User.styled';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [warmEmail, setWarnEmail] = useState(false);
    const [warnPassword, setWarnPassword] = useState(false);
    const [isSampleLogin, setIsSampleLogin] = useState(false);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const onSubmit = async event => {
        event.preventDefault();
        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        function checkPasswordFormat(password) {
            return password.length >= 6;
        }

        const validEmail = emailRegex.test(emailValue);
        const validPassword = checkPasswordFormat(passwordValue);

        if (validEmail && validPassword) {
            authLoginApi(emailValue, passwordValue)
                .then(result => {
                    if (
                        result.message ===
                        '이메일 또는 비밀번호가 일치하지 않습니다.'
                    ) {
                        dispatch(openAlertModal());
                    } else {
                        // 임시변경
                        sessionStorage.setItem('Token', result.user.token);
                        sessionStorage.setItem(
                            'AccountName',
                            result.user.accountname,
                        );
                        sessionStorage.setItem('Id', result.user._id);
                        navigate('/home');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            !validEmail ? setWarnEmail(true) : setWarnEmail(false);
            !validPassword ? setWarnPassword(true) : setWarnPassword(false);
        }
    };

    const handleSampleLoginChange = event => {
        const { checked } = event.target;
        setIsSampleLogin(checked);
        if (!isSampleLogin) {
            emailRef.current.value = 'test@deskoration.com';
            passwordRef.current.value = 'test123';
        } else {
            emailRef.current.value = null;
            passwordRef.current.value = null;
        }
    };

    return (
        <>
            <S.UserForm onSubmit={onSubmit}>
                <S.InputBox>
                    <Input
                        label={'email'}
                        type={'email'}
                        inputRef={emailRef}
                        warning={warmEmail}
                    />
                    {warmEmail && (
                        <WarningMsg
                            msg={'올바른 형식의 이메일을 입력하세요.'}
                        />
                    )}
                    <Input
                        label={'password'}
                        type={'password'}
                        inputRef={passwordRef}
                        warning={warnPassword}
                    />
                    {warnPassword && (
                        <WarningMsg msg={'6자 이상의 비밀번호를 입력하세요.'} />
                    )}
                </S.InputBox>
                <S.SampleLoginBox>
                    <input
                        type="checkbox"
                        id="sampleLoginCheckbox"
                        checked={isSampleLogin}
                        onChange={handleSampleLoginChange}
                    />
                    <label htmlFor="sampleLoginCheckbox">체험하기</label>
                </S.SampleLoginBox>
                <GradientButton
                    type={'submit'}
                    gra={true}
                    width={'100%'}
                    padding={'20px'}
                >
                    로그인
                </GradientButton>
            </S.UserForm>
        </>
    );
};

export default Login;
