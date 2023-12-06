import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { validEmailApi } from '../../service/auth_service';

import GradientButton from '../../components/GradientButton/GradientButton';
import { Input } from '../../components/Input/Input';

import * as S from './User.styled';

const Signup = () => {
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
    } = useForm();

    const submitSignup = async data => {
        if (data.email && data.password) {
            validEmailApi(data.email)
                .then(result => {
                    if (result.message === '사용 가능한 이메일 입니다.') {
                        navigate('/profileUpload', {
                            state: {
                                emailValue: data.email,
                                passwordValue: data.password,
                            },
                        });
                    } else if (
                        result.message === '이미 가입된 이메일 주소 입니다.'
                    ) {
                        setError('email', {
                            type: 'email',
                            message: '이미 가입된 이메일 주소 입니다.',
                        });
                    } else {
                        throw new Error(result.message);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <S.UserForm onSubmit={handleSubmit(submitSignup)}>
            <S.InputBox>
                <Input
                    label={'email'}
                    id={'email'}
                    type={'email'}
                    register={register}
                    error={errors.email}
                    registerOptions={{
                        required: '사용할 이메일을 입력해주세요.',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: '올바른 형식의 이메일을 입력해주세요.',
                        },
                    }}
                />
                <Input
                    label={'password'}
                    id={'password'}
                    type={'password'}
                    register={register}
                    error={errors.password}
                    registerOptions={{
                        required: '사용할 비밀번호를 입력해주세요.',
                        minLength: {
                            value: 6,
                            message: '6자 이상의 비밀번호를 입력하세요.',
                        },
                    }}
                />
            </S.InputBox>
            <GradientButton
                type={'submit'}
                gra={true}
                width={'100%'}
                padding={'20px'}
            >
                회원가입
            </GradientButton>
        </S.UserForm>
    );
};

export default Signup;
