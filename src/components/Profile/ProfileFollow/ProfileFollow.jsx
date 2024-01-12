import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'firebase.js';

import { useFollowMutationData, useProfileQueryData } from 'hooks/useQueryData';
import GradientButton from '../../common/GradientButton/GradientButton';

import * as S from './ProfileFollow.styled';

const ProfileFollow = ({ profileData, postLength }) => {
    const navigate = useNavigate();
    const { username } = useParams(); //선택한 게시물 아이디 값
    const isMyProfile = !username;

    const { data: myProfileData } = useProfileQueryData(true);

    const moveToEditProfile = () => {
        navigate('/profileEdit');
    };

    const { followMutation, unfollowMutation } =
        useFollowMutationData(username);

    const userFollowToggle = accountName => {
        if (profileData?.isfollow) {
            unfollowMutation.mutate(accountName);
        } else {
            followMutation.mutate(accountName);
        }
    };

    const fetchRoomId = async () => {
        try {
            const chatRoomId = await findChatRoomId(myProfileData.accountname);
            navigateToChatRoom(chatRoomId, profileData);
        } catch (error) {
            console.error(error);
        }
    };
    //자신의 계정이 속해 있는 방정보 찾기
    const findChatRoomId = async accountname => {
        const roomRef = collection(db, 'rooms');
        const roomSnapshot = await getDocs(
            query(
                roomRef,
                where('participants', 'array-contains', accountname),
            ),
        );

        for (let room of roomSnapshot.docs) {
            const data = room.data();
            if (data.participants.includes(profileData.accountname)) {
                return data.roomId;
            }
        }
        return null;
    };

    const navigateToChatRoom = (chatRoomId, userProfile) => {
        const path = chatRoomId
            ? `/chat/${chatRoomId}`
            : `/chat/${userProfile.accountname}`;
        const state = {
            roomId: chatRoomId,
            user: {
                accountname: userProfile.accountname,
                username: userProfile.username,
                image: userProfile.image,
            },
        };

        if (!chatRoomId) {
            delete state.roomId;
        }

        navigate(path, { state });
    };

    return (
        <>
            <S.UserDataList>
                <p>
                    <span>{postLength}</span>
                    <span>게시물</span>
                </p>
                <Link
                    to={
                        isMyProfile
                            ? `/followerList`
                            : `/followerList/${username}`
                    }
                >
                    <p>
                        <span>{profileData?.followerCount}</span>
                        <span>팔로워</span>
                    </p>
                </Link>
                <Link
                    to={
                        isMyProfile
                            ? `/followingList`
                            : `/followingList/${username}`
                    }
                >
                    <p>
                        <span>{profileData?.followingCount}</span>
                        <span>팔로잉</span>
                    </p>
                </Link>
            </S.UserDataList>
            {isMyProfile ? (
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
                        onClick={() => fetchRoomId(profileData.accountname)}
                    >
                        메시지 보내기
                    </GradientButton>
                </S.SocialButtonBox>
            )}
        </>
    );
};

export default ProfileFollow;
