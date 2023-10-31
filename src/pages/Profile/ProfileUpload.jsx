import React, { useState, useRef, useEffect } from 'react';
import * as S from './ProfileUpload.styled';
import basicImg from '../../assets/images/Profile.svg';
import Input from '../../components/Input/Input';
import { WarningMsg } from '../../components/Input/WarningMsg';
import { ReactComponent as ImgUpload } from '../../assets/images/ImgUpload.svg';
import { ImgConvert } from '../../hooks/img_Uploader';
import GradientButton from '../../components/GradientButton/GradientButton';
import { useLocation } from 'react-router';

export const ProfileUpload = () => {
    const [photoURL, setPhotoURL] = useState(basicImg);
    const [data, setData] = useState({
        image: '',
        userName: '',
        id: '',
        intro: '',
    });

    const [initialAccess, setInitialAccess] = useState(true);
    const [isIDAvailable, setIsIDAvailable] = useState(false);
    const [isImageAdded, setIsImageAdded] = useState(false);
    const { emailValue, passwordValue } = useLocation().state;

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
            setData(prev => ({
                ...prev,
                image: photoURL,
            }));
        }

        setIsImageAdded(true);
    };

    const deleteImg = () => {
        setIsImageAdded(false);
        setPhotoURL(basicImg);
        setData(prev => ({
            ...prev,
            image: photoURL,
        }));
    };

    // input에 입력한 값을 data에 저장
    const handleInput = (event, label) => {
        switch (label) {
            case '사용자 이름':
                setData(prev => ({
                    ...prev,
                    userName: event.target.value,
                }));
                break;
            case '계정 ID':
                setData(prev => ({
                    ...prev,
                    id: event.target.value,
                }));
                break;
            case '소개':
                setData(prev => ({
                    ...prev,
                    intro: event.target.value,
                }));
                break;
            default:
                console.error('없는 항목입니다.');
        }
    };

    // 유효성 검사 함수
    const checkValidUserName = userName => {
        return userName.length >= 2 && userName.length <= 10;
    };

    const checkValidID = id => {
        const regex = /^[a-zA-Z0-9._]+$/;
        return id.length >= 2 && regex.test(id);
    };

    const checkValidIntro = intro => {
        return intro.length > 0;
    };

    // 계정 검증 함수
    const checkAccountName = async () => {
        const baseURL = 'https://api.mandarin.weniv.co.kr/';
        const reqPath = 'user/accountnamevalid';
        const reqURL = baseURL + reqPath;
        try {
            const response = await fetch(reqURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: { accountname: data.id } }),
            });
            const result = await response.json();

            if (result.message === '사용 가능한 계정ID 입니다.') {
                setIsIDAvailable(true);
            } else if (result.message === '이미 가입된 계정ID 입니다.') {
                setIsIDAvailable(false);
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // submit 함수
    const dataSubmit = async event => {
        event.preventDefault();
        setInitialAccess(false);

        if (
            !checkValidUserName(data.userName) ||
            !checkValidID(data.id) ||
            !checkValidIntro(data.intro)
        ) {
            return;
        }
        await checkAccountName();
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
                            $ref={userNameEl}
                            fn={event => handleInput(event, '사용자 이름')}
                            warning={
                                !initialAccess &&
                                !checkValidUserName(data.userName)
                            }
                        />
                        {!initialAccess &&
                            !checkValidUserName(data.userName) && (
                                <WarningMsg msg={'2~10자 이내여야 합니다.'} />
                            )}
                        <Input
                            label="계정 ID"
                            $ref={idEl}
                            fn={event => handleInput(event, '계정 ID')}
                            warning={
                                !initialAccess &&
                                (!checkValidID(data.id) ||
                                    isIDAvailable === false)
                            }
                        />
                        {!initialAccess && !checkValidID(data.id) ? (
                            <WarningMsg
                                msg={
                                    '2글자 이상이며, 영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
                                }
                            />
                        ) : !initialAccess && !isIDAvailable ? (
                            <WarningMsg msg="이미 가입된 계정ID 입니다." />
                        ) : null}
                        <Input
                            label="소개"
                            $ref={introEl}
                            fn={event => handleInput(event, '소개')}
                            warning={
                                !initialAccess && !checkValidIntro(data.intro)
                            }
                        />
                        {!initialAccess && !checkValidIntro(data.intro) && (
                            <WarningMsg msg={'자신에 대해서 소개해주세요!'} />
                        )}
                    </S.InputBox>
                    <GradientButton
                        children="시작하기"
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
