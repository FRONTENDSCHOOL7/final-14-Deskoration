import React, { useState } from 'react';
import * as S from './Profile.styled';
import Footer from '../../components/Footer/Footer';
import GradientButton from '../../components/GradientButton/GradientButton';
import Article from '../Home/Article';

const Profile = () => {
    const content =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum minima possimus praesentium'; // 여기에 표시할 텍스트 추가
    return (
        <>
            <S.ProfileHeader>
                <button>
                    <S.Backwardicon />
                </button>
                <h2>user</h2>
            </S.ProfileHeader>
            <S.ProfileContainer>
                <S.UserInfo>
                    <img
                        src="/images/DeskSetup.jpg"
                        alt=""
                        className="user-img"
                    />
                    <div className="user-introduce">
                        <p className="user-name">username</p>
                        <p className="user-info">
                            {content}
                            <button>더보기</button>
                        </p>
                    </div>
                </S.UserInfo>
                <GradientButton
                    type={'button'}
                    gra={'true'}
                    width={'310px'}
                    padding={'10px'}
                >
                    프로필 편집
                </GradientButton>
                <S.UserDataList>
                    <button className="user-post">
                        <p>1234</p>
                        <p>게시물</p>
                    </button>
                    <button className="user-follow">
                        <p>1234</p>
                        <p>팔로우</p>
                    </button>
                    <button className="user-following">
                        <p>1234</p>
                        <p>팔로잉</p>
                    </button>
                </S.UserDataList>
                <S.UserPostings>
                    <Article />
                </S.UserPostings>
            </S.ProfileContainer>
            <Footer />
        </>
    );
};

export default Profile;
