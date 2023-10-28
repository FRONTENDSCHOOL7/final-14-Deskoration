import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../../components/Input/Input';
import { WarningMsg } from '../../../components/Input/WarningMsg';
import { GradientButton } from '../../../components/GradientButton/GradientButton.styled';

import * as S from './Signup.styled';

const Signup = () => {
    const navigate = useNavigate();

    const [warmEmail, setWarnEmail] = useState(true);
    const [warnPassword, setWarnPassword] = useState(true);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const onSubmit = event => {
        event.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        function checkPasswordFormat(password) {
            return password.length >= 6;
        }
        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;

        const validEmail = emailRegex.test(emailValue);
        const validPassword = checkPasswordFormat(passwordValue);

        if (validEmail && validPassword) {
            console.log('오케이');
            // navigate('/profileUpload', {
            //     state: { emailValue: emailValue, passwordValue: passwordValue },
            // });
        } else {
            !validEmail ? setWarnEmail(false) : setWarnEmail(true);
            !validPassword ? setWarnPassword(false) : setWarnPassword(true);
        }
    };

    return (
        <S.SignupForm onSubmit={onSubmit}>
            <S.InputBox>
                <Input
                    label={'email'}
                    inputRef={emailRef}
                    warning={!warmEmail}
                />
                {!warmEmail && (
                    <WarningMsg msg={'이메일 형식이 올바르지 않습니다.'} />
                )}
                <Input
                    label={'password'}
                    inputRef={passwordRef}
                    warning={!warnPassword}
                />
                {!warnPassword && (
                    <WarningMsg msg={'비밀번호는 6자 이상이여야 합니다.'} />
                )}
            </S.InputBox>
            <GradientButton $gra={true} width={'100%'} $padding={'20px'}>
                회원가입
            </GradientButton>
        </S.SignupForm>
    );
};

export default Signup;
