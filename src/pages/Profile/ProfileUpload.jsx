import React, { useState, useRef, useEffect } from 'react';
import * as S from './ProfileUpload.styled';
import basicImg from '../../assets/images/Profile.svg';
import Input from '../../components/Input/Input';
import { WarningMsg } from '../../components/Input/WarningMsg';
import { ImgConvert } from '../../hooks/img_Uploader';
import { ValidAccountName } from '../../service/auth_service';
import GradientButton from '../../components/GradientButton/GradientButton';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';

export const ProfileUpload = () => {
    const navigate = useNavigate();

    const [photoURL, setPhotoURL] = useState(basicImg);
    const [existID, setExistID] = useState(null);
    const [isImageAdded, setIsImageAdded] = useState(false);
    const [warnUserName, setWarnUserName] = useState(false);
    const [warnID, setWarnID] = useState(false);
    const { emailValue, passwordValue } = useLocation().state || {};

    const userNameEl = useRef(null);
    const idEl = useRef(null);
    const introEl = useRef(null);

    // 업로드한 이미지 url 저장
    const handleFileChange = event => {
        const file = event.target.files[0];
        if (!file) {
            setPhotoURL(prev => setPhotoURL(prev));
        } else {
            ImgConvert(file, setPhotoURL);
        }

        setIsImageAdded(true);
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
            try {
                setWarnID(false);
                const result = await ValidAccountName(idValue);
                if (result.message === '사용 가능한 계정ID 입니다.') {
                    setExistID(false);
                } else if (result.message === '이미 가입된 계정ID 입니다.') {
                    setExistID(true);
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            !validID ? setWarnID(true) : setWarnID(false);
        }

        // 유효성 검사를 통과하면 post 요청
        if (validUserName && validID && !existID) {
            const baseURL = 'https://api.mandarin.weniv.co.kr/';
            const reqURL = `${baseURL}user`;
            try {
                const response = await fetch(reqURL, {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        user: {
                            username: userNameValue,
                            email: emailValue,
                            password: passwordValue,
                            accountname: idValue,
                            intro: introValue,
                            image: photoURL,
                        },
                    }),
                });
                const result = await response.json();
                if (result.message === '회원가입 성공') {
                    navigate('/home');
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <section>
            {/* <header>헤더</header> */}
            <S.ProfileMain>
                <S.ProfileTitle>프로필 설정</S.ProfileTitle>
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
                                onChange={handleFileChange}
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
                        />
                        {warnUserName && (
                            <WarningMsg msg={'2~10자 이내여야 합니다.'} />
                        )}
                        <Input
                            label="계정 ID"
                            inputRef={idEl}
                            warning={warnID || existID}
                        />
                        {warnID ? (
                            <WarningMsg
                                msg={
                                    '2글자 이상이며, 영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
                                }
                            />
                        ) : existID ? (
                            <WarningMsg msg="이미 가입된 계정ID 입니다." />
                        ) : null}
                        <Input label="소개" inputRef={introEl} />
                    </S.InputBox>
                    <GradientButton
                        children={'Deskoration 시작하기'}
                        type={'submit'}
                        gra={true}
                        width={'100%'}
                        padding={'20px'}
                    />
                </form>
            </S.ProfileMain>
        </section>
    );
};

export default ProfileUpload;
