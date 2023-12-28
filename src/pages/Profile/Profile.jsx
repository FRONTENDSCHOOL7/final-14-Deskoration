import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getMyProfileAPI } from '../../service/profile_service';
import { getMyPostAPI } from '../../service/post_service';
import axiosInstance from '../../service/axiosInstance';

import usePageHandler from '../../hooks/usePageHandler';

import GradientButton from '../../components/GradientButton/GradientButton';
import Loader from '../../components/Loading/Loader';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import NotFoundPage from '../404/NotFoundPage';

import * as S from './Profile.styled';
import Article from '../Home/Article';
import NoContents from '../../components/NoContents/NoContents';

const Profile = () => {
    usePageHandler('text', '나의 프로필');
    const queryClient = useQueryClient();
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

    console.log(profileData);
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
        queryClient.clear();
        axiosInstance.defaults.headers.Authorization = 'Bearer null';

        navigate('/');
    };
    // console.log(postData);
    return (
        <>
            {profileLoading || postLoading ? (
                <Loader />
            ) : (
                <>
                    <S.ProfileContainer>
                        <S.UserInfo>
                            <img src={profileData?.image} alt="" />

                            <div>
                                <p>{profileData?.username}</p>
                                <p>
                                    {expandedContent
                                        ? profileData?.intro
                                        : profileData?.intro.slice(0, 53)}
                                    {profileData?.intro?.length > 30 && (
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
                        <S.UserDataList>
                            <p>
                                <span>{postData?.length}</span>
                                <span>게시물</span>
                            </p>

                            <Link to={`/followerList`}>
                                <p>
                                    <span>{profileData?.followerCount}</span>
                                    <span>팔로워</span>
                                </p>
                            </Link>
                            <Link to="/followingList">
                                <p>
                                    <span>{profileData?.followingCount}</span>
                                    <span>팔로잉</span>
                                </p>
                            </Link>
                        </S.UserDataList>
                        <GradientButton
                            type={'button'}
                            gra={'true'}
                            width={'100%'}
                            padding={'10px'}
                            onClick={moveToEditProfile}
                        >
                            프로필 편집
                        </GradientButton>
                        {postData?.length === 0 ? (
                            <NoContents />
                        ) : (
                            <Article articles={postData} />
                        )}
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
