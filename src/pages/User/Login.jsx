import React from 'react';
import { useLoginMutationData } from '../../hooks/useQueryData';

import { useForm } from 'react-hook-form';

import GradientButton from '../../components/GradientButton/GradientButton';
import { Input } from '../../components/Input/Input';

import * as S from './User.styled';

const Login = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        watch,
        setError,
        clearErrors,
    } = useForm();

    const checkboxValue = watch('checkbox');

    const { mutate: login } = useLoginMutationData();

    const submitLogin = data => {
        if (data.email && data.password) {
            login({
                emailValue: data.email,
                passwordValue: data.password,
            });
        }
    };

    const handleSampleLoginChange = e => {
        const isChecked = e.target.checked;
        setValue('email', isChecked ? 'test@deskoration.com' : '');
        setValue('password', isChecked ? 'test123' : '');

        if (isChecked) {
            clearErrors('email');
            clearErrors('password');
        } else {
            // 체크박스가 체크되지 않았을 때 에러 메시지를 추가
            setError('email', {
                type: 'email',
                message: '이메일을 입력해주세요.',
            });
            setError('password', {
                type: 'password',
                message: '비밀번호를 입력해주세요.',
            });
        }
    };

    return (
        <S.UserForm onSubmit={handleSubmit(submitLogin)}>
            <S.InputBox>
                <Input
                    label={'email'}
                    id={'email'}
                    type={'email'}
                    register={register}
                    error={errors.email}
                    registerOptions={{
                        required: '이메일을 입력해주세요.',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: '올바른 형식의 이메일을 입력해주세요.',
                        },
                    }}
                    onChange={e => {
                        if (!checkboxValue) setValue('email', e.target.value);
                    }}
                />
                <Input
                    label={'password'}
                    id={'password'}
                    type={'password'}
                    register={register}
                    error={errors.password}
                    registerOptions={{
                        required: '비밀번호를 입력해주세요.',
                        minLength: {
                            value: 6,
                            message: '6자 이상의 비밀번호를 입력하세요.',
                        },
                    }}
                />
            </S.InputBox>
            <S.SampleLoginBox>
                <input
                    type="checkbox"
                    id="sampleLoginCheckbox"
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
    );
};

export default Login;
