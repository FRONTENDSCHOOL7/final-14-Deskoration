import React, { useEffect, useState } from 'react';
import * as S from './FollowerList.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import {
    followService,
    followerService,
    unFollowService,
} from '../../service/follow_service';
import usePageHandler from '../../hooks/usePageHandler';

const FollowerList = () => {
    const baseURL = 'https://api.mandarin.weniv.co.kr/';
    const token = sessionStorage.getItem('tempToken');
    const myAccountName = sessionStorage.getItem('tempAccountName');
    const [followerData, setFollowerData] = useState([]);
    const [follow, setFollow] = useState(true);
    usePageHandler('text', '팔로워');

    // 팔로워 리스트 불러오기
    useEffect(() => {
        const fetchFollower = async () => {
            await followerService(baseURL, token, myAccountName)
                .then(data => {
                    setFollowerData(data);
                    // console.log('follower:', data);
                })
                .catch(error => {
                    console.error('API 요청 중 오류 발생: ', error);
                });
        };
        fetchFollower();
    }, []);

    const followerList = followerData.map(data => data.accountname);
    // console.log('followerList:', followerList);

    const handleFollowToggle = async accountname => {
        setFollow(!follow);
        console.log('클릭시 이름받아오기!:', accountname);
        const follower = followerData.find(f => f.accountname === accountname);
        if (follower) {
            try {
                if (follower.isFollowing) {
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
                const updatedFollowerData = followerData.map(f =>
                    f.accountname === accountname
                        ? { ...f, isFollowing: !f.isFollowing }
                        : f,
                );
                setFollowerData(updatedFollowerData);
            } catch (error) {
                console.error('API 요청 중 오류 발생:', error);
            }
        }
    };

    return (
        <>
            <S.FollowerContainer>
                {followerData.map(data => (
                    <S.FollowerList key={data._id}>
                        <S.FollowerInfo>
                            <img src={data?.image} className="follower-img" />
                            <div>{data?.accountname}</div>
                        </S.FollowerInfo>
                        <GradientButton
                            width={'80px'}
                            onClick={() =>
                                handleFollowToggle(data?.accountname)
                            }
                            gra={follow ? true : false}
                        >
                            {follow ? '팔로우' : '팔로잉'}
                        </GradientButton>
                    </S.FollowerList>
                ))}
            </S.FollowerContainer>
        </>
    );
};

export default FollowerList;
