import React, { useState, useRef } from 'react';
import * as S from './ProfileUpload.styled';
import basicImg from '../../assets/images/Profile.svg';
import { Input } from '../../components/Input/Input';
import { WarningMsg } from '../../components/Input/WarningMsg';
import { uploadImgApi } from '../../service/img_service';
import {
    authLoginApi,
    authSignUpApi,
    validAccountNameApi,
} from '../../service/auth_service';
import GradientButton from '../../components/GradientButton/GradientButton';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import usePageHandler from '../../hooks/usePageHandler';

export const ProfileUpload = () => {
    const navigate = useNavigate();
    const baseURL = 'https://api.mandarin.weniv.co.kr';
    const noImage = 'Ellipse.png';

    const [photoURL, setPhotoURL] = useState(basicImg);
    const [existID, setExistID] = useState(null);
    const [isImageAdded, setIsImageAdded] = useState(false);
    const [warnUserName, setWarnUserName] = useState(false);
    const [warnID, setWarnID] = useState(false);
    const [file, setFile] = useState();
    const { emailValue, passwordValue } = useLocation().state || {};

    const userNameEl = useRef(null);
    const idEl = useRef(null);
    const introEl = useRef(null);

    usePageHandler('text', '프로필 설정');

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
        function checkValidUserName(userName) {
            return userName.length >= 2 && userName.length <= 10;
        }
        function checkValidID(id) {
            const regex = /^[a-zA-Z0-9._]+$/;
            return id.length >= 2 && regex.test(id);
        }

        const validID = checkValidID(idValue);
        const validUserName = checkValidUserName(userNameValue);

        // 사용자 이름에 따른 state 변경
        setWarnUserName(!validUserName);

        // 계정 ID 검사
        if (validID) {
            setWarnID(false);
            validAccountNameApi(idValue)
                .then(result => {
                    if (result.message === '사용 가능한 계정ID 입니다.') {
                        setExistID(false);
                    } else if (
                        result.message === '이미 가입된 계정ID 입니다.'
                    ) {
                        setExistID(true);
                    } else {
                        throw new Error(result.message);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            !validID ? setWarnID(true) : setWarnID(false);
        }

        // 유효성 검사를 통과하면 post 요청
        if (validUserName && validID && !existID) {
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
                        children={'Deskoration 시작하기'}
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
