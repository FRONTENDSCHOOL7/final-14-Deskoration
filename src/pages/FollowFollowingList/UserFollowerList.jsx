import React from 'react';
import * as S from './FollowerList.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import {
    postFollowApi,
    deleteFollowApi,
    getFollowerApi,
} from '../../service/follow_service';
import usePageHandler from '../../hooks/usePageHandler';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const UserFollowerList = () => {
    const token = sessionStorage.getItem('Token');
    const myAccountName = sessionStorage.getItem('AccountName');
    const { username } = useParams();
    const queryClient = useQueryClient();
    usePageHandler('text', '팔로워');

    // 팔로워 리스트 불러오기
    const {
        data: userFollowerData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['userFollowerData', token, username],
        queryFn: () => getFollowerApi(token, username),
    });

    const userFollow = useMutation({
        mutationFn: accountName => postFollowApi(token, accountName),
        onSuccess: () => {
            queryClient.invalidateQueries([
                'userFollowerData',
                token,
                myAccountName,
            ]);
        },
    });

    const userUnFollow = useMutation({
        mutationFn: accountName => deleteFollowApi(token, accountName),
        onSuccess: () => {
            queryClient.invalidateQueries([
                'userFollowerData',
                token,
                myAccountName,
            ]);
        },
    });

    const handleFollowToggle = accountName => {
        const follower = userFollowerData.find(
            f => f.accountname === accountName,
        );
        if (follower) {
            if (follower.isfollow) {
                userUnFollow.mutate(accountName);
            } else {
                userFollow.mutate(accountName);
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
                {userFollowerData.map(data => (
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
                        {data.accountname !== myAccountName && (
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
        </>
    );
};

export default UserFollowerList;
