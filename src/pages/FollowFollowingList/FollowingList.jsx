import React, { useEffect, useState } from 'react';
import * as S from './FollowingList.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import {
    followService,
    followingService,
    unFollowService,
} from '../../service/follow_service';
import usePageHandler from '../../hooks/usePageHandler';

const FollowingList = () => {
    const baseURL = 'https://api.mandarin.weniv.co.kr/';
    const token = sessionStorage.getItem('tempToken');
    const myAccountName = sessionStorage.getItem('tempAccountName');
    const [followingData, setFollowingData] = useState([]);
    const [follow, setFollow] = useState(false);
    usePageHandler('text', '팔로잉');

    // 팔로잉 리스트 불러오기
    useEffect(() => {
        const fetchFollowing = async () => {
            await followingService(baseURL, token, myAccountName)
                .then(data => {
                    setFollowingData(data);
                    // console.log('follower:', data);
                })
                .catch(error => {
                    console.error('API 요청 중 오류 발생: ', error);
                });
        };
        fetchFollowing();
    }, []);

    const followingList = followingData.map(data => data.accountname);
    // console.log('followerList:', followerList);

    // 팔로우, 언팔로우 기능 구현
    useEffect(() => {
        // console.log('accountname:', followerData[0]?.accountname);
        console.log('accountname:', followingList);
        followingList.map(follower => {
            followService(baseURL, token, follower)
                .then(data => {
                    setFollow(data.profile.isfollow);
                    // console.log('follower:', data);
                })
                .catch(error => {
                    console.error('API 요청 중 오류 발생: ', error);
                });
        });
    }, []);

    // console.log('follow:', follow);

    const handleFollowToggle = async accountname => {
        setFollow(!follow);
        console.log('클릭시 이름받아오기!:', accountname);
        const following = followingData.find(
            f => f.accountname === accountname,
        );
        if (following) {
            try {
                if (following.isFollowing) {
                    const result = await unFollowService(
                        baseURL,
                        token,
                        accountname,
                    );
                } else {
                    const result = await followService(
                        baseURL,
                        token,
                        accountname,
                    );
                }
                const updatedFollowerData = followingData.map(f =>
                    f.accountname === accountname
                        ? { ...f, isFollowing: !f.isFollowing }
                        : f,
                );
                setFollowingData(updatedFollowerData);
            } catch (error) {
                console.error('API 요청 중 오류 발생:', error);
            }
        }
    };

    return (
        <>
            <S.FollowingContainer>
                {followingData.map(data => (
                    <S.FollowingList key={data._id}>
                        <S.FollowingInfo>
                            <img src={data?.image} className="follower-img" />
                            <div>{data?.accountname}</div>
                        </S.FollowingInfo>
                        <GradientButton
                            width={'80px'}
                            onClick={() =>
                                handleFollowToggle(data?.accountname)
                            }
                            gra={follow ? true : false}
                        >
                            {follow ? '팔로우' : '팔로잉'}
                        </GradientButton>
                    </S.FollowingList>
                ))}
            </S.FollowingContainer>
        </>
    );
};

export default FollowingList;
