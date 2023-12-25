import React from 'react';
import * as S from './FollowerList.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import {
    postFollowAPI,
    deleteFollowAPI,
    getFollowerAPI,
} from '../../service/follow_service';
import usePageHandler from '../../hooks/usePageHandler';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const FollowerList = () => {
    const myAccountName = sessionStorage.getItem('AccountName');
    const queryClient = useQueryClient();
    usePageHandler('text', '팔로워');

    const {
        data: followerData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['followerData', myAccountName],
        queryFn: () => getFollowerAPI(myAccountName),
    });

    const follow = useMutation({
        mutationFn: accountName => postFollowAPI(accountName),
        onSuccess: () => {
            queryClient.invalidateQueries(['followerData', myAccountName]);
        },
    });

    const unfollow = useMutation({
        mutationFn: accountName => deleteFollowAPI(accountName),
        onSuccess: () => {
            queryClient.invalidateQueries(['followerData', myAccountName]);
        },
    });

    const handleFollowToggle = accountName => {
        const follower = followerData.find(f => f.accountname === accountName);
        if (follower) {
            if (follower.isfollow) {
                unfollow.mutate(accountName);
            } else {
                follow.mutate(accountName);
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
                        <GradientButton
                            width={'80px'}
                            onClick={() =>
                                handleFollowToggle(data?.accountname)
                            }
                            gra={!data.isfollow ? true : false}
                        >
                            {!data.isfollow ? '팔로우' : '팔로잉'}
                        </GradientButton>
                    </S.FollowerList>
                ))}
            </S.FollowerContainer>
        </>
    );
};

export default FollowerList;
