import React, { useEffect, useState } from 'react';
import * as S from './FollowerList.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import {
    followServiceApi,
    unFollowServiceApi,
    followerServiceApi,
} from '../../service/follow_service';
import usePageHandler from '../../hooks/usePageHandler';

const FollowerList = () => {
    const baseURL = 'https://api.mandarin.weniv.co.kr/';
    const token = sessionStorage.getItem('Token');
    const myAccountName = sessionStorage.getItem('AccountName');
    const [followerData, setFollowerData] = useState([]);
    const [follow, setFollow] = useState(false);
    usePageHandler('text', '팔로워');

    // 팔로워 리스트 불러오기
    useEffect(() => {
        const fetchFollower = () => {
            followerServiceApi(baseURL, token, myAccountName)
                .then(data => {
                    setFollowerData(data);
                })
                .catch(error => {
                    console.error('API 요청 중 오류 발생: ', error);
                });
        };
        fetchFollower();
    }, []);

    useEffect(() => {
        followServiceApi(baseURL, token, followerData[0]?.accountname)
            .then(data => {
                setFollow(data.profile.isfollow);
            })
            .catch(error => {
                console.error('API 요청 중 오류 발생: ', error);
            });
    }, []);

    const handleFollowToggle = async accountname => {
        setFollow(!follow);
        // console.log('클릭시 이름받아오기!:', accountname);
        const follower = followerData.find(f => f.accountname === accountname);
        if (follower) {
            try {
                if (follower.isFollowing) {
                    const result = await unFollowServiceApi(
                        baseURL,
                        token,
                        accountname,
                    );
                } else {
                    const result = await followServiceApi(
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
