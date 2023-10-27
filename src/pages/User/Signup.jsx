import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/Input/Input';
import { WarningMsg } from '../../components/Input/WarningMsg';
import { GradientButton } from '../../components/GradientButton/GradientButton.styled';
import { ValidEmail } from '../../service/auth_service';

import * as S from './User.styled';

const Signup = () => {
    const navigate = useNavigate();

    const [warmEmail, setWarnEmail] = useState(false);
    const [warnPassword, setWarnPassword] = useState(false);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const onSubmit = async event => {
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
            try {
                const result = await ValidEmail(emailValue);

                if (result.message === '사용 가능한 이메일 입니다.') {
                    console.log('오케이');
                    // navigate('/profileUpload', {
                    //     state: { emailValue: emailValue, passwordValue: passwordValue },
                    // });
                } else if (
                    result.message === '이미 가입된 이메일 주소 입니다.'
                ) {
                    alert(result.message);
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                console.error('error');
            }
        } else {
            !validEmail ? setWarnEmail(true) : setWarnEmail(false);
            !validPassword ? setWarnPassword(true) : setWarnPassword(false);
        }
    };

    return (
        <S.UserForm onSubmit={onSubmit}>
            <S.InputBox>
                <Input
                    label={'email'}
                    inputRef={emailRef}
                    warning={warmEmail}
                />
                {warmEmail && (
                    <WarningMsg msg={'이메일 형식이 올바르지 않습니다.'} />
                )}
                <Input
                    label={'password'}
                    inputRef={passwordRef}
                    warning={warnPassword}
                />
                {warnPassword && (
                    <WarningMsg msg={'비밀번호는 6자 이상이여야 합니다.'} />
                )}
            </S.InputBox>
            <GradientButton $gra={true} width={'100%'} $padding={'20px'}>
                회원가입
            </GradientButton>
        </S.UserForm>
    );
};

export default Signup;