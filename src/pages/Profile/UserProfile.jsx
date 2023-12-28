import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

import { getUserProfileAPI } from '../../service/profile_service';
import { postFollowAPI, deleteFollowAPI } from '../../service/follow_service';
import { getMyPostAPI } from '../../service/post_service';

import GradientButton from '../../components/GradientButton/GradientButton';
import Loader from '../../components/Loading/Loader';
import usePageHandler from '../../hooks/usePageHandler';

import * as S from './UserProfile.styled';
import NotFoundPage from '../404/NotFoundPage';

const UserProfile = () => {
    const [expandedContent, setExpandedContent] = useState(false);
    const { username } = useParams(); //선택한 게시물 아이디 값

    const navigate = useNavigate();

    const {
        data: profileData,
        isLoading: profileLoading,
        error: profileError,
    } = useQuery({
        queryKey: ['getUserProfile', username],
        queryFn: () => getUserProfileAPI(username),
        select: data => data.profile,
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

    usePageHandler('text', profileData?.username);

    const toggleExpandedContent = () => {
        setExpandedContent(!expandedContent);
    };

    // To.Herrypi  mutation 사용하기!
    const queryClient = useQueryClient();

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
                    profileData.accountname,
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
                            accountname: profileData.accountname,
                            username: profileData.username,
                            image: profileData.image,
                        },
                    },
                });
            } else {
                navigate(`/chat/${profileData.accountname}`, {
                    state: {
                        user: {
                            accountname: profileData.accountname,
                            username: profileData.username,
                            image: profileData.image,
                        },
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (profileLoading || postLoading) {
        return <Loader />;
    }

    return (
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
                                    {expandedContent ? '접기' : '...더보기'}
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

                <S.SocialButtonBox>
                    <GradientButton
                        type={'button'}
                        gra={!profileData?.isfollow ? true : false}
                        width={'100%'}
                        padding={'10px'}
                        onClick={() =>
                            userFollowToggle(profileData?.accountname)
                        }
                    >
                        {!profileData?.isfollow ? '팔로우' : '팔로잉'}
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
                <S.UserPostings>
                    {postData?.map((post, index) => (
                        <Link key={post.id} to={`/detailPost/${post.id}`}>
                            <img src={post.image} alt="게시물 목록" />
                        </Link>
                    ))}
                </S.UserPostings>
            </S.ProfileContainer>
            <S.MoreButton>
                <S.MoreIcon />
            </S.MoreButton>
            {(profileError || postError) && <NotFoundPage />}
        </>
    );
};

export default UserProfile;
