import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
    authLoginAPI,
    authSignUpAPI,
    validAccountNameAPI,
} from '../../service/auth_service';
import { updateProfileAPI } from '../../service/profile_service';

import { openAlertModal } from '../../features/modal/alertModalSlice';

import usePageHandler from '../../hooks/usePageHandler';
import { useImgUpload } from '../../hooks/useImgUpload';

import AlertModal from '../../components/AlertModal/AlertModal';
import { Input } from '../../components/Input/Input';
import GradientButton from '../../components/GradientButton/GradientButton';

import * as S from './ProfileUpload.styled';
import basicImg from '../../assets/images/basicImg.png';

export const ProfileUpload = () => {
    // 헤더에 문구 넣기
    usePageHandler('text', '프로필 설정');

    const noImage = '/Ellipse.png';

    const queryClient = useQueryClient();
    // 프로필 수정하기를 위한 데이터
    const myProfileData = queryClient.getQueryData(['getMyProfile']);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // editProfile
    const editPage = location.pathname.includes('/profileEdit');

    const [imageURL, setImageURL] = useState(basicImg);
    const [isImageAdded, setIsImageAdded] = useState(false);
    const [imageFile, setImageFile] = useState('');
    const { emailValue, passwordValue } = useLocation().state || {};

    const {
        register,
        handleSubmit,
        setValue,
        setFocus,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            userName: '',
            userID: '',
            intro: '',
        },
    });

    // 초기 렌더링 시에 포커스
    useEffect(() => {
        setFocus('userName');
    }, [setFocus]);

    useEffect(() => {
        if (myProfileData) {
            const userData = myProfileData.user;
            setImageURL(userData.image);
            if (process.env.REACT_APP_BASE_URL + noImage !== userData.image) {
                setIsImageAdded(true);
            }

            // 불러온 데이터를 화면에 렌더링
            setValue('userName', userData.username);
            setValue('userID', userData.accountname);
            setValue('intro', userData.intro);
        }
    }, [myProfileData, setValue]);

    // 프로필 데이터가 시간초과로 사라진 경우
    useEffect(() => {
        if (!myProfileData) {
            dispatch(openAlertModal('잠시 후 다시 시도해주세요.'));
        }
    }, [dispatch, myProfileData, navigate]);

    //계정 ID 검사
    const validateUserID = id => {
        return validAccountNameAPI(id)
            .then(result => {
                if (result.message === '사용 가능한 계정ID 입니다.') {
                    return true;
                } else if (result.message === '이미 가입된 계정ID 입니다.') {
                    return false;
                } else {
                    throw new Error(result.message);
                }
            })
            .catch(error => {
                console.error(error);
                return false;
            });
    };

    // 로그인 API
    const logInMutation = useMutation({
        mutationFn: ({ emailValue, passwordValue }) =>
            authLoginAPI(emailValue, passwordValue),
        onSuccess: data => {
            // 토큰 외에 저장 금지 아마도?
            sessionStorage.setItem('Token', data.user.token);
            navigate('/home');
        },
    });

    // 회원가입 API
    const signUpMutation = useMutation({
        mutationFn: userData => authSignUpAPI(userData),
        onSuccess: data => {
            if (data.message === '회원가입 성공') {
                logInMutation.mutate({ emailValue, passwordValue });
            } else if (data.message === '잘못된 접근입니다.') {
                dispatch(openAlertModal('잠시 후 다시 시도해주세요.'));
            }
        },
        onError() {
            dispatch(openAlertModal('잠시 후 다시 시도해주세요.'));
        },
    });

    // 프로필 편집 API
    const profileUpdateMutation = useMutation({
        mutationFn: async ({ userData }) => {
            const updatedData = await updateProfileAPI(userData);
            queryClient.setQueryData(['getMyProfile'], currentProfileData => {
                return { ...currentProfileData, ...updatedData };
            });

            return updatedData;
        },

        onSuccess: () => {
            navigate('/profile');
        },
        onError(error) {
            console.log(error);
        },
    });

    // 업로드한 이미지 url 저장
    const handleUploadImg = useImgUpload(
        setImageFile,
        setImageURL,
        setIsImageAdded,
    );

    // 이미지 삭제
    const deleteImg = () => {
        setIsImageAdded(false);
        setImageURL(basicImg);
    };

    // submit 함수
    const submitProfile = async profileData => {
        //회원 가입 시 초기 프로필 설정일 경우
        if (isValid && !editPage) {
            const userData = {
                user: {
                    username: profileData.userName,
                    email: emailValue,
                    password: passwordValue,
                    accountname: profileData.userID,
                    intro: profileData.intro,
                    image: !imageFile
                        ? process.env.REACT_APP_BASE_URL + noImage
                        : process.env.REACT_APP_BASE_URL + imageFile,
                },
            };
            signUpMutation.mutate(userData);
        }
        // 프로필 편집일 경우
        if (isValid && editPage) {
            const userData = {
                user: {
                    username: profileData.userName,
                    accountname: profileData.userID,
                    intro: profileData.intro,
                    image:
                        !imageFile && imageURL === basicImg
                            ? process.env.REACT_APP_BASE_URL + noImage
                            : !imageFile && imageURL
                            ? myProfileData.user.image
                            : process.env.REACT_APP_BASE_URL + '/' + imageFile,
                },
            };
            profileUpdateMutation.mutate({ userData });
        }
    };

    return (
        <section>
            <S.ProfileContainer>
                <form onSubmit={handleSubmit(submitProfile)}>
                    <S.ProfileImgBox>
                        <img src={imageURL} alt="프로필 이미지" />
                        {isImageAdded && (
                            <button type="button" onClick={deleteImg}>
                                <S.DeleteIcon />
                            </button>
                        )}
                        <S.ImgUploadBox>
                            <input
                                type="file"
                                id="profileUpload"
                                onChange={handleUploadImg}
                            />
                            <label htmlFor="profileUpload">
                                <S.ImgUploadIcon />
                            </label>
                        </S.ImgUploadBox>
                    </S.ProfileImgBox>
                    <S.InputBox>
                        <Input
                            label={'사용자 이름'}
                            id={'userName'}
                            error={errors.userName}
                            placeholder={'2~10자 이내여야 합니다.'}
                            register={register}
                            registerOptions={{
                                required: '필수 정보를 입력하세요.',
                                minLength: {
                                    value: 2,
                                    message: '2~10자 이내여야 합니다.',
                                },
                                maxLength: {
                                    value: 10,
                                    message: '2~10자 이내여야 합니다.',
                                },
                            }}
                        />
                        <Input
                            label={'계정 ID'}
                            id={'userID'}
                            error={errors.userID}
                            placeholder={
                                '영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
                            }
                            register={register}
                            registerOptions={{
                                required: '필수 정보를 입력하세요.',
                                pattern: {
                                    value: /^[a-zA-Z0-9._]+$/,
                                    message:
                                        '영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.',
                                },
                                validate: async id => {
                                    const result = await validateUserID(id);
                                    return (
                                        result || '이미 가입된 계정ID 입니다.'
                                    );
                                },
                            }}
                        />
                        <Input
                            label={'소개'}
                            id={'intro'}
                            error={errors.intro}
                            placeholder={'자신을 소개해주세요.'}
                            register={register}
                        />
                    </S.InputBox>
                    <GradientButton
                        children={
                            editPage
                                ? '프로필 변경하기'
                                : 'Deskoration 시작하기'
                        }
                        type={'submit'}
                        gra={true}
                        width={'100%'}
                        padding={'20px'}
                    />
                </form>
            </S.ProfileContainer>
            <AlertModal gobackButton={() => navigate('/profile')} />
        </section>
    );
};

export default ProfileUpload;
