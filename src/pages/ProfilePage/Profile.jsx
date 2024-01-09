import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import axiosInstance from 'service/axiosInstance';
import usePageHandler from 'hooks/usePageHandler';
import { useProfileQueryData, useUserPostQueryData } from 'hooks/useQueryData';

import NotFoundPage from '../404/NotFoundPage';
import Content from 'components/Home/Content/Content';
import ProfileFollow from 'components/Profile/ProfileFollow/ProfileFollow';
import Loader from 'components/common/Loading/Loader';
import BottomSheet from 'components/common/BottomSheet/BottomSheet';
import NoContents from 'components/common/NoContents/NoContents';

import * as S from './Profile.styled';

const Profile = () => {
    const queryClient = useQueryClient();
    const [expandedContent, setExpandedContent] = useState(false);
    const [isBottomSheet, setIsBottomSheet] = useState(false);
    const { username } = useParams(); //선택한 게시물 아이디 값
    const isMyProfile = !username;

    const navigate = useNavigate();

    const {
        data: profileData,
        isFetching: profileFetching,
        error: profileError,
    } = useProfileQueryData(isMyProfile, username);

    const {
        data: postData,
        isFetching: postFetching,
        error: postError,
    } = useUserPostQueryData(profileData);

    usePageHandler('text', isMyProfile ? '나의 프로필' : profileData?.username);

    const hadleBottomSheet = () => setIsBottomSheet(!isBottomSheet);

    const toggleExpandedContent = () => {
        setExpandedContent(!expandedContent);
    };

    const logOut = () => {
        sessionStorage.clear();
        queryClient.clear();
        axiosInstance.defaults.headers.Authorization = 'Bearer null';

        navigate('/');
    };

    return (
        <>
            {profileFetching || postFetching ? (
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
                        <ProfileFollow
                            profileData={profileData}
                            postLength={postData.length}
                        />

                        {postData?.length === 0 ? (
                            <NoContents
                                mainTxt={'아직 등록한 게시글이 없습니다!'}
                                subTxt={'첫 번째 사진을 공유해보세요'}
                                link={'/postUpload'}
                                btnLabel={'게시글 작성하기'}
                            />
                        ) : (
                            <Content posts={postData} />
                        )}
                    </S.ProfileContainer>
                    {isMyProfile && (
                        <>
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
                        </>
                    )}
                    {(profileError || postError) && <NotFoundPage />}
                </>
            )}
        </>
    );
};

export default Profile;
