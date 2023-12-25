import React from 'react';
import * as S from './FollowingList.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import {
    postFollowAPI,
    deleteFollowAPI,
    getFollowingAPI,
} from '../../service/follow_service';
import usePageHandler from '../../hooks/usePageHandler';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const FollowingList = () => {
    const myAccountName = sessionStorage.getItem('AccountName');
    const queryClient = useQueryClient();
    usePageHandler('text', '팔로잉');

    const {
        data: followingData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['followingData', myAccountName],
        queryFn: () => getFollowingAPI(myAccountName),
    });

    const following = useMutation({
        mutationFn: accountName => postFollowAPI(accountName),
        onSuccess: () => {
            queryClient.invalidateQueries(['followingData', myAccountName]);
        },
    });

    const unFollowing = useMutation({
        mutationFn: accountName => deleteFollowAPI(accountName),
        onSuccess: () => {
            queryClient.invalidateQueries(['followingData', myAccountName]);
        },
    });

    const handleFollowToggle = accountName => {
        const followingD = followingData.find(
            f => f.accountname === accountName,
        );
        if (followingD) {
            if (followingD.isfollow) {
                unFollowing.mutate(accountName);
            } else {
                following.mutate(accountName);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <S.FollowingContainer>
                {followingData?.map(data => (
                    <S.FollowingList key={data._id}>
                        <Link to={`/profile/${data.accountname}`}>
                            <S.FollowingInfo>
                                <img
                                    src={data?.image}
                                    className="follower-img"
                                    alt="유저 프로필 이미지"
                                />
                                <div>{data?.accountname}</div>
                            </S.FollowingInfo>
                        </Link>
                        <GradientButton
                            width={'80px'}
                            onClick={() =>
                                handleFollowToggle(data?.accountname)
                            }
                            gra={!data.isfollow ? true : false}
                        >
                            {!data.isfollow ? '팔로우' : '팔로잉'}
                        </GradientButton>
                    </S.FollowingList>
                ))}
            </S.FollowingContainer>
        </>
    );
};

export default FollowingList;
