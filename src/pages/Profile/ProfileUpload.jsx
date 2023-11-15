import React, { useState, useRef, useEffect } from 'react';
import * as S from './ProfileUpload.styled';
import basicImg from '../../assets/images/basicImg.png';
import { Input } from '../../components/Input/Input';
import { WarningMsg } from '../../components/Input/WarningMsg';
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
    const [existID, setExistID] = useState(null);
    const [isImageAdded, setIsImageAdded] = useState(false);
    const [warnUserName, setWarnUserName] = useState(false);
    const [warnID, setWarnID] = useState(false);
    const [file, setFile] = useState();
    const { emailValue, passwordValue } = useLocation().state || {};
    const [profileData, setProfileData] = useState(null);

    const userNameEl = useRef(null);
    const idEl = useRef(null);
    const introEl = useRef(null);

    // 헤더에 문구 넣기
    usePageHandler('text', '프로필 설정');

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
                    userNameEl.current.value = userNameValue;
                    idEl.current.value = idValue;
                    introEl.current.value = introValue;
                })
                .catch(error => {
                    console.error('API 요청 중 오류 발생: ', error);
                });
        }
    }, [token]);

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

    // submit 함수
    const dataSubmit = async event => {
        event.preventDefault();

        const userNameValue = userNameEl.current.value;
        const idValue = idEl.current.value;
        const introValue = introEl.current.value;

        // 유효성 검사
        const checkValidUserName = userName => {
            return userName.length >= 2 && userName.length <= 10;
        };
        const checkValidID = id => {
            const regex = /^[a-zA-Z0-9._]+$/;
            return id.length >= 2 && regex.test(id);
        };

        const validID = checkValidID(idValue);
        const validUserName = checkValidUserName(userNameValue);

        // 사용자 이름에 따른 state 변경
        setWarnUserName(!validUserName);

        // 계정 ID 검사
        const validateAccountName = id => {
            return new Promise((resolve, reject) => {
                if (!checkValidID(id)) {
                    setWarnID(true);
                    resolve(false); // 유효하지 않은 경우 false 반환
                } else {
                    validAccountNameApi(id)
                        .then(result => {
                            if (
                                result.message === '사용 가능한 계정ID 입니다.'
                            ) {
                                setExistID(false);
                                resolve(true); // 유효한 경우 true 반환
                            } else if (
                                result.message === '이미 가입된 계정ID 입니다.'
                            ) {
                                setExistID(true);
                                resolve(false); // 이미 존재하는 경우 false 반환
                            } else {
                                reject(new Error(result.message)); // 예외 처리
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            reject(error); // 에러 처리
                        });
                }
            });
        };

        const isIDValid = await validateAccountName(idValue);

        // 유효성 검사를 통과하면 post 요청
        // 회원 가입 시 초기 프로필 설정일 경우
        if (isIDValid && validUserName && !editPage) {
            const userData = {
                username: userNameValue,
                email: emailValue,
                password: passwordValue,
                accountname: idValue,
                intro: introValue,
                image: !file ? baseURL + noImage : baseURL + file,
            };
            authSignUpApi(userData)
                .then(result => {
                    if (result.message === '회원가입 성공') {
                        authLoginApi(emailValue, passwordValue).then(data => {
                            console.log(data);
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
        else if (isIDValid && validUserName && editPage) {
            const userData = {
                user: {
                    username: userNameValue,
                    accountname: idValue,
                    intro: introValue,
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
                        sessionStorage.setItem('AccountName', idValue);
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
                <form onSubmit={dataSubmit}>
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
                            label="사용자 이름"
                            inputRef={userNameEl}
                            warning={warnUserName}
                            placeholder={'2~10자 이내여야 합니다.'}
                        />
                        {warnUserName && (
                            <WarningMsg msg={'2~10자 이내여야 합니다.'} />
                        )}
                        <Input
                            label="계정 ID"
                            inputRef={idEl}
                            warning={warnID || existID}
                            placeholder={
                                '영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
                            }
                        />
                        {warnID ? (
                            <WarningMsg
                                msg={
                                    '영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
                                }
                            />
                        ) : existID ? (
                            <WarningMsg msg="이미 가입된 계정ID 입니다." />
                        ) : null}
                        <Input
                            label="소개"
                            inputRef={introEl}
                            placeholder={'자신을 소개해주세요.'}
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
