import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getMyProfileAPI } from '../../service/profile_service';
import { getMyPostAPI } from '../../service/post_service';

import usePageHandler from '../../hooks/usePageHandler';

import GradientButton from '../../components/GradientButton/GradientButton';
import Loader from '../../components/Loading/Loader';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import NotFoundPage from '../404/NotFoundPage';

import * as S from './Profile.styled';

const Profile = () => {
    usePageHandler('text', '나의 프로필');

    const navigate = useNavigate();

    const [expandedContent, setExpandedContent] = useState(false);
    const [isBottomSheet, setIsBottomSheet] = useState(false);

    const {
        data: profileData,
        isLoading: profileLoading,
        error: profileError,
    } = useQuery({
        queryKey: ['getMyProfile'],
        queryFn: () => getMyProfileAPI(),
        select: data => data.user,
    });

    const {
        data: postData,
        isLoading: postLoading,
        error: postError,
    } = useQuery({
        queryKey: ['getMyPost'],
        queryFn: () => getMyPostAPI(profileData.accountname),
        select: data =>
            data.filter(item => item.content.includes('"deskoration"')),
        enabled: !!profileData,
    });

    const hadleBottomSheet = () => setIsBottomSheet(!isBottomSheet);

    const toggleExpandedContent = () => {
        setExpandedContent(!expandedContent);
    };

    // editProfile
    const moveToEditProfile = () => {
        navigate('/profileEdit');
    };

    const logOut = () => {
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <>
            {profileLoading || postLoading ? (
                <Loader />
            ) : (
                <>
                    <S.ProfileContainer>
                        <S.UserInfo>
                            <img
                                src={profileData.image}
                                alt=""
                                className="user-img"
                            />

                            <div className="user-introduce">
                                <p className="user-name">
                                    {profileData.accountname}
                                </p>
                                <p className="user-info">
                                    {expandedContent
                                        ? profileData.intro
                                        : profileData.intro.slice(0, 53)}
                                    {profileData.intro.length > 30 && (
                                        <S.ToggleButton
                                            type="button"
                                            onClick={toggleExpandedContent}
                                        >
                                            {expandedContent
                                                ? '접기'
                                                : '...더보기'}
                                        </S.ToggleButton>
                                    )}
                                </p>
                            </div>
                        </S.UserInfo>
                        <GradientButton
                            type={'button'}
                            gra={'true'}
                            width={'100%'}
                            padding={'10px'}
                            onClick={moveToEditProfile}
                        >
                            프로필 편집
                        </GradientButton>
                        <S.UserDataList>
                            <button className="user-post">
                                <p>{postData.length}</p>
                                <p>게시물</p>
                            </button>
                            <Link to={`/followerList`}>
                                <button className="user-follow">
                                    <p>{profileData.followerCount}</p>
                                    <p>팔로워</p>
                                </button>
                            </Link>
                            <Link to="/followingList">
                                <button className="user-following">
                                    <p>{profileData.followingCount}</p>
                                    <p>팔로잉</p>
                                </button>
                            </Link>
                        </S.UserDataList>
                        <S.UserPostings>
                            {postData.map(post => (
                                <Link
                                    key={post.id}
                                    to={`/detailPost/${post.id}`}
                                >
                                    <img src={post.image} alt="게시물 목록" />
                                </Link>
                            ))}
                        </S.UserPostings>
                    </S.ProfileContainer>
                    <S.MoreButton onClick={hadleBottomSheet}>
                        <S.MoreIcon />
                    </S.MoreButton>
                    <BottomSheet
                        isBottomSheet={isBottomSheet}
                        hadleBottomSheet={hadleBottomSheet}
                        deleteFn={logOut}
                        oneButton
                        children={'로그아웃'}
                    />
                    {(profileError || postError) && <NotFoundPage />}
                </>
            )}
        </>
    );
};

export default Profile;
