import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import usePageHandler from '../../hooks/usePageHandler';
import { useFollowQueryData, useFollowMutationData } from 'hooks/useQueryData';
import { getMyProfileAPI } from '../../service/profile_service';

import GradientButton from '../../components/common/GradientButton/GradientButton';
import NoContents from '../../components/common/NoContents/NoContents';
import Loader from '../../components/common/Loading/Loader';
import NotFoundPage from '../404/NotFoundPage';

import * as S from './FollowerList.styled';

const FollowerList = () => {
    const { username } = useParams();
    const isOtherUser = username !== undefined;
    const queryClient = useQueryClient();
    usePageHandler('text', '팔로워');

    const myProfileData = queryClient.getQueryData(['getMyProfile']);
    const myProfileAccountName = myProfileData?.user?.accountname;

    const { data: profileDataAccountName } = useQuery({
        queryKey: ['getMyProfile'],
        queryFn: () => getMyProfileAPI(),
        select: data => data.user.accountname,
        enabled: !myProfileData,
    });

    const myAccountName = myProfileAccountName || profileDataAccountName;
    const accountNameToUse = isOtherUser ? username : myAccountName;

    const {
        data: followerData = [],
        isLoading,
        isError,
    } = useFollowQueryData(isOtherUser, accountNameToUse);

    const { followMutation, unfollowMutation } =
        useFollowMutationData(accountNameToUse);

    const handleFollowToggle = accountName => {
        const follower = followerData.find(f => f.accountname === accountName);
        if (follower) {
            if (follower.isfollow) {
                unfollowMutation.mutate(accountName);
            } else {
                followMutation.mutate(accountName);
            }
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <NotFoundPage />;
    }

    return (
        <>
            {followerData.length > 0 ? (
                <S.FollowerContainer>
                    {followerData.map(data => (
                        <S.FollowerList key={data._id}>
                            <Link to={`/profile/${data.accountname}`}>
                                <S.FollowerInfo>
                                    <img
                                        src={data?.image}
                                        className="follower-img"
                                        alt="유저 프로필 이미지"
                                    />
                                    <div>{data?.accountname}</div>
                                </S.FollowerInfo>
                            </Link>
                            {(!isOtherUser ||
                                data.accountname !== myAccountName) && (
                                <GradientButton
                                    width={'80px'}
                                    onClick={() =>
                                        handleFollowToggle(data?.accountname)
                                    }
                                    gra={!data.isfollow ? true : false}
                                >
                                    {!data.isfollow ? '팔로우' : '팔로잉'}
                                </GradientButton>
                            )}
                        </S.FollowerList>
                    ))}
                </S.FollowerContainer>
            ) : accountNameToUse !== undefined ? (
                <NoContents
                    mainTxt={'아직 팔로우 중인 유저가 없습니다!'}
                    subTxt={'다른 유저를 먼저 팔로우 해보세요. '}
                    link={'/home'}
                    btnLabel={'홈으로 돌아가기'}
                />
            ) : (
                <Loader />
            )}
        </>
    );
};

export default FollowerList;
