import React, { useState, useEffect } from 'react';
import * as S from './ProfileUpload.styled';
import basicImg from '../../assets/images/basicImg.png';
import { Input } from '../../components/Input/Input';
import { uploadImgApi } from '../../service/img_service';
import {
    authLoginApi,
    authSignUpApi,
    validAccountNameApi,
} from '../../service/auth_service';
import {
    updateProfileApi,
    getMyProfileApi,
} from '../../service/profile_service';
import GradientButton from '../../components/GradientButton/GradientButton';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import imageCompression from 'browser-image-compression';
import usePageHandler from '../../hooks/usePageHandler';

export const ProfileUpload = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = sessionStorage.getItem('Token');
    const editPage = location.pathname.includes('/profileEdit');

    const baseURL = 'https://api.mandarin.weniv.co.kr/';
    const noImage = 'Ellipse.png';

    const [photoURL, setPhotoURL] = useState(basicImg);
    const [isImageAdded, setIsImageAdded] = useState(false);
    const [file, setFile] = useState();
    const { emailValue, passwordValue } = useLocation().state || {};
    const [profileData, setProfileData] = useState(null);

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

    // 헤더에 문구 넣기
    usePageHandler('text', '프로필 설정');

    // 초기 렌더링 시에 포커스
    useEffect(() => {
        setFocus('userName');
    }, [setFocus]);

    // 프로필 편집일 경우, API 호출해서 데이터 받아오기
    useEffect(() => {
        if (editPage) {
            getMyProfileApi(token)
                .then(data => {
                    setProfileData(data.user);
                    setPhotoURL(data.user.image);
                    if (baseURL + noImage !== data.user.image)
                        setIsImageAdded(true);

                    // 불러온 데이터를 화면에 렌더링
                    const userNameValue = data.user.username;
                    const idValue = data.user.accountname;
                    const introValue = data.user.intro;

                    setValue('userName', userNameValue);
                    setValue('userID', idValue);
                    setValue('intro', introValue);
                })
                .catch(error => {
                    console.error('API 요청 중 오류 발생: ', error);
                });
        }
    }, [editPage, setValue, token]);

    // 업로드한 이미지 url 저장
    const handleUploadImg = async event => {
        const regex = new RegExp(/(.png|.jpg|.jpeg|.gif|.tif|.heic|bmp)/);

        const file = event.target.files[0];
        if (!file) return;

        const options = {
            maxSizeMB: 5,
        };
        const fileTypeOptions = { ...options, fileType: 'image/jpeg' };

        try {
            const compressedBlob = await imageCompression(
                file,
                regex.test(file) ? options : fileTypeOptions,
            );
            const compressedFile = new File(
                [compressedBlob],
                regex.test(file)
                    ? compressedBlob.name
                    : compressedBlob.name.split('.')[0] + '.jpeg',
                {
                    type: compressedBlob.type,
                },
            );
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
                const imgData = new FormData();
                imgData.append('image', compressedFile);
                uploadImgApi(imgData, setFile);
                setPhotoURL(reader.result);
            };
            setIsImageAdded(true);
        } catch (e) {
            console.log(e);
        }
    };

    // 이미지 삭제
    const deleteImg = () => {
        setIsImageAdded(false);
        setPhotoURL(basicImg);
    };

    // 계정 ID 검사
    const validateUserID = id => {
        return new Promise((resolve, reject) => {
            validAccountNameApi(id)
                .then(result => {
                    if (result.message === '사용 가능한 계정ID 입니다.') {
                        resolve(true); // 유효한 경우 true 반환
                    } else if (
                        result.message === '이미 가입된 계정ID 입니다.'
                    ) {
                        resolve(false); // 이미 존재하는 경우 false 반환
                    } else {
                        reject(new Error(result.message)); // 예외 처리
                    }
                })
                .catch(error => {
                    console.error(error);
                    reject(error); // 에러 처리
                });
        });
    };

    // submit 함수
    const dataSubmit = async data => {
        //회원 가입 시 초기 프로필 설정일 경우
        if (isValid && !editPage) {
            const userData = {
                username: data.userName,
                email: emailValue,
                password: passwordValue,
                accountname: data.userID,
                intro: data.intro,
                image: !file ? baseURL + noImage : baseURL + file,
            };
            authSignUpApi(userData)
                .then(result => {
                    if (result.message === '회원가입 성공') {
                        authLoginApi(emailValue, passwordValue).then(data => {
                            sessionStorage.setItem('Token', data.user.token);
                            sessionStorage.setItem(
                                'AccountName',
                                data.user.accountname,
                            );
                            sessionStorage.setItem('Id', data.user._id);
                            navigate('/home');
                        });
                    } else {
                        throw new Error(result.message);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
        // 프로필 편집일 경우
        else if (isValid && editPage) {
            const userData = {
                user: {
                    username: data.userName,
                    accountname: data.userID,
                    intro: data.intro,
                    image:
                        !file && photoURL === basicImg
                            ? baseURL + noImage
                            : !file && photoURL
                            ? profileData.image
                            : baseURL + file,
                },
            };
            updateProfileApi(token, userData)
                .then(result => {
                    if (result.message === '이미 사용중이 계정 ID입니다.') {
                        throw new Error(result.message);
                    } else {
                        sessionStorage.setItem('AccountName', data.userID);
                        navigate('/profile');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <section>
            <S.ProfileContainer>
                <form onSubmit={handleSubmit(dataSubmit)}>
                    <S.ProfileImgBox>
                        <S.ProfileImg src={photoURL} alt="프로필 이미지" />
                        {isImageAdded && (
                            <S.DeleteButton type="button" onClick={deleteImg}>
                                <S.DeleteIcon />
                            </S.DeleteButton>
                        )}

                        <S.ImgUploadBox>
                            <S.ImgUploadInput
                                type="file"
                                id="profileUpload"
                                onChange={handleUploadImg}
                            />
                            <S.ImgUploadLabel htmlFor="profileUpload">
                                <S.ImgUploadIcon />
                            </S.ImgUploadLabel>
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
                                validate: async value => {
                                    const result = await validateUserID(value);
                                    return (
                                        result || '이미 존재하는 계정 ID입니다.'
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
        </section>
    );
};

export default ProfileUpload;
