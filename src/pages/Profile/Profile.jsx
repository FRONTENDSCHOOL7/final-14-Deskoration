import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

import {
    getMyProfileAPI,
    getUserProfileAPI,
} from '../../service/profile_service';
import { postFollowAPI, deleteFollowAPI } from '../../service/follow_service';
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
    const queryClient = useQueryClient();
    const [expandedContent, setExpandedContent] = useState(false);
    const [isBottomSheet, setIsBottomSheet] = useState(false);

    const { username } = useParams(); //선택한 게시물 아이디 값

    const navigate = useNavigate();

    //나의 프로필 부분 -> username === undefined
    const {
        data: profileData,
        isLoading: profileLoading,
        error: profileError,
    } = useQuery({
        queryKey: ['getMyProfile'],
        queryFn: () => getMyProfileAPI(),
        select: data => data.user,
        enabled: username === undefined,
    });
    //유저 프로필 부분 => username === username
    const {
        data: userProfileData,
        isLoading: userProfileLoading,
        error: userProfileError,
    } = useQuery({
        queryKey: ['getUserProfile', username],
        queryFn: () => getUserProfileAPI(username),
        select: data => data.profile,
        enabled: username !== undefined,
    });

    //게시물 데이터 가져오기 내프로필 유저프로필 경우에 따라
    const {
        data: postData,
        isLoading: postLoading,
        error: postError,
    } = useQuery({
        queryKey: ['getMyPost'],
        queryFn: () =>
            getMyPostAPI(
                username === undefined
                    ? profileData.accountname
                    : userProfileData.accountname,
            ),
        select: data =>
            data.filter(item => item.content.includes('"deskoration"')),
        enabled: username === undefined ? !!profileData : !!userProfileData,
    });

    usePageHandler(
        'text',
        username === undefined ? '나의 프로필' : userProfileData?.username,
    );

    const hadleBottomSheet = () => setIsBottomSheet(!isBottomSheet);

    const toggleExpandedContent = () => {
        setExpandedContent(!expandedContent);
    };

    // editProfile
    const moveToEditProfile = () => {
        navigate('/profileEdit');
    };

    // To.Herrypi  mutation 사용하기!
    // 팔로우 팔로잉
    const follow = useMutation({
        mutationFn: accountName => postFollowAPI(accountName),
        onSuccess: () => {
            queryClient.invalidateQueries(['getUserProfile', username]);
        },
    });

    const unfollow = useMutation({
        mutationFn: accountName => deleteFollowAPI(accountName),
        onSuccess: () => {
            queryClient.invalidateQueries(['getUserProfile', username]);
        },
    });

    const userFollowToggle = accountName => {
        if (profileData?.isfollow) {
            unfollow.mutate(accountName);
        } else {
            follow.mutate(accountName);
        }
    };
    // 채팅 방 생성 관련 코드
    const fetchRoomId = async accountname => {
        try {
            let chatRoomId = '';
            const roomRef = collection(db, 'rooms');
            const roomSnapshot = await getDocs(
                query(
                    roomRef,
                    where('participants', 'array-contains', accountname),
                ),
            );

            for (let room of roomSnapshot.docs) {
                const data = room.data();
                let result = data.participants.includes(
                    userProfileData.accountname,
                );
                if (result) {
                    chatRoomId = data.roomId;
                    break;
                }
            }

            if (chatRoomId) {
                navigate(`/chat/${chatRoomId}`, {
                    state: {
                        roomId: chatRoomId,
                        user: {
                            accountname: userProfileData.accountname,
                            username: userProfileData.username,
                            image: userProfileData.image,
                        },
                    },
                });
            } else {
                navigate(`/chat/${userProfileData.accountname}`, {
                    state: {
                        user: {
                            accountname: userProfileData.accountname,
                            username: userProfileData.username,
                            image: userProfileData.image,
                        },
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logOut = () => {
        sessionStorage.clear();
        queryClient.clear();
        axiosInstance.defaults.headers.Authorization = 'Bearer null';

        navigate('/');
    };

    return (
        <>
            {(profileLoading && userProfileLoading) || postLoading ? (
                <Loader />
            ) : (
                <>
                    <S.ProfileContainer>
                        {username === undefined ? (
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
                        ) : (
                            // 상대 유저프로필 일경우
                            <S.UserInfo>
                                <img src={userProfileData?.image} alt="" />
                                <div>
                                    <p>{userProfileData?.username}</p>
                                    <p>
                                        {expandedContent
                                            ? userProfileData?.intro
                                            : userProfileData?.intro.slice(
                                                  0,
                                                  53,
                                              )}
                                        {userProfileData?.intro?.length >
                                            30 && (
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
                        )}
                        <S.UserDataList>
                            <p>
                                <span>{postData?.length}</span>
                                <span>게시물</span>
                            </p>

                            <Link to={`/followerList`}>
                                {username === undefined ? (
                                    <p>
                                        <span>
                                            {profileData?.followerCount}
                                        </span>
                                        <span>팔로워</span>
                                    </p>
                                ) : (
                                    <p>
                                        <span>
                                            {userProfileData?.followerCount}
                                        </span>
                                        <span>팔로워</span>
                                    </p>
                                )}
                            </Link>
                            <Link to="/followingList">
                                {username === undefined ? (
                                    <p>
                                        <span>
                                            {profileData?.followingCount}
                                        </span>
                                        <span>팔로잉</span>
                                    </p>
                                ) : (
                                    <p>
                                        <span>
                                            {userProfileData?.followingCount}
                                        </span>
                                        <span>팔로잉</span>
                                    </p>
                                )}
                            </Link>
                        </S.UserDataList>
                        {username === undefined ? (
                            <GradientButton
                                type={'button'}
                                gra={'true'}
                                width={'100%'}
                                padding={'10px'}
                                onClick={moveToEditProfile}
                            >
                                프로필 편집
                            </GradientButton>
                        ) : (
                            <S.SocialButtonBox>
                                <GradientButton
                                    type={'button'}
                                    gra={
                                        !userProfileData?.isfollow
                                            ? true
                                            : false
                                    }
                                    width={'100%'}
                                    padding={'10px'}
                                    onClick={() =>
                                        userFollowToggle(
                                            userProfileData?.accountname,
                                        )
                                    }
                                >
                                    {!userProfileData?.isfollow
                                        ? '팔로우'
                                        : '팔로잉'}
                                </GradientButton>
                                <GradientButton
                                    type={'button'}
                                    width={'100%'}
                                    padding={'10px'}
                                    onClick={fetchRoomId}
                                >
                                    메시지 보내기
                                </GradientButton>
                            </S.SocialButtonBox>
                        )}

                        {postData?.length === 0 ? (
                            <NoContents
                                mainTxt={'아직 등록한 게시글이 없습니다!'}
                                subTxt={'첫 번째 사진을 공유해보세요'}
                                link={'/postUpload'}
                                btnLabel={'게시글 작성하기'}
                            />
                        ) : (
                            <Article articles={postData} />
                        )}
                    </S.ProfileContainer>
                    <S.MoreButton onClick={hadleBottomSheet}>
                        <S.MoreIcon />
                    </S.MoreButton>
                    {username === undefined && (
                        <BottomSheet
                            isBottomSheet={isBottomSheet}
                            hadleBottomSheet={hadleBottomSheet}
                            deleteFn={logOut}
                            oneButton
                            children={'로그아웃'}
                        />
                    )}

                    {(username === undefined
                        ? profileError
                        : userProfileError || postError) && <NotFoundPage />}
                </>
            )}
        </>
    );
};

export default Profile;
