import React, { useState } from 'react';
import * as S from './ProfileUpload.styled';
import basicImg from '../../assets/images/Profile.svg';
import { ReactComponent as ImgUpload } from '../../assets/images/ImgUpload.svg';
import { ImgConvert } from '../../hooks/img_Uploader';
import GradientButton from '../../components/GradientButton/GradientButton';

export const ProfileUpload = () => {
    const [photoURL, setPhotoURL] = useState(basicImg);

    const handleFileChange = event => {
        const file = event.target.files[0];
        if (!file) {
            setPhotoURL(prev => setPhotoURL(prev));
        } else {
            ImgConvert(file, setPhotoURL);
        }
    };

    return (
        <section>
            <header>헤더</header>
            <S.ProfileMain>
                <S.ProfileTitle>프로필 설정</S.ProfileTitle>
                <form>
                    <S.ProfileImgContainer>
                        <S.ProfileImg src={photoURL} alt="프로필 이미지" />
                        <S.ImgUploadContainer>
                            <S.ImgUploadInput
                                type="file"
                                id="profileUpload"
                                onChange={handleFileChange}
                            />
                            <S.ImgUploadLabel htmlFor="profileUpload">
                                <ImgUpload
                                    stroke="#fff"
                                    width={24}
                                    height={24}
                                />
                            </S.ImgUploadLabel>
                        </S.ImgUploadContainer>
                    </S.ProfileImgContainer>
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
