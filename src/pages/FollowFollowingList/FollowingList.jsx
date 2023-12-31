import React from 'react';
import * as S from './FollowerList.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import NoContents from '../../components/NoContents/NoContents';
import Loader from '../../components/Loading/Loader';
import NotFoundPage from '../404/NotFoundPage';
import {
    postFollowAPI,
    deleteFollowAPI,
    getFollowingAPI,
} from '../../service/follow_service';
import { getMyProfileAPI } from '../../service/profile_service';
import usePageHandler from '../../hooks/usePageHandler';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const FollowingList = () => {
    const { username } = useParams();
    const isOtherUser = username !== undefined;
    const queryClient = useQueryClient();
    usePageHandler('text', '팔로잉');

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
        data: followingData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: [
            isOtherUser ? 'userFollowingData' : 'followingData',
            accountNameToUse,
        ],
        queryFn: () => getFollowingAPI(accountNameToUse),
    });

    const follow = useMutation({
        mutationFn: accountName => postFollowAPI(accountName),
        onSuccess: () => {
            queryClient.invalidateQueries([
                isOtherUser ? 'userFollowingData' : 'followingData',
                accountNameToUse,
            ]);
        },
    });

    const unfollow = useMutation({
        mutationFn: accountName => deleteFollowAPI(accountName),
        onSuccess: () => {
            queryClient.invalidateQueries([
                isOtherUser ? 'userFollowingData' : 'followingData',
                accountNameToUse,
            ]);
        },
    });

    const handleFollowToggle = accountName => {
        const following = followingData.find(
            f => f.accountname === accountName,
        );
        if (following) {
            if (following.isfollow) {
                unfollow.mutate(accountName);
            } else {
                follow.mutate(accountName);
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
            {followingData.length > 0 ? (
                <S.FollowerContainer>
                    {followingData.map(data => (
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
            ) : (
                <NoContents
                    mainTxt={'아직 나를 팔로우하는 유저가 없습니다!'}
                    subTxt={'다른 유저를 먼저 팔로우 해보세요. '}
                    link={'/home'}
                    btnLabel={'홈으로 돌아가기'}
                />
            )}
        </>
    );
};

export default FollowingList;
