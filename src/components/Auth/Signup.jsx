import React from 'react';
import { useForm } from 'react-hook-form';

import { useEmailValidMutationData } from 'hooks/useQueryData';

import GradientButton from '../common/GradientButton/GradientButton';
import { Input } from '../common/Input/Input';

import * as S from 'pages/AuthPage/AuthPage.styled';

const Signup = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
        getValues,
    } = useForm();

    const emailValidMutation = useEmailValidMutationData(
        getValues('email'),
        getValues('password'),
        setError,
    );

    const submitSignup = async data => {
        if (data.email && data.password) {
            emailValidMutation.mutate(data.email);
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
