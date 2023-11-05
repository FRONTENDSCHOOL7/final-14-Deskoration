import React, { useEffect, useState } from 'react';
import * as S from './FollowerList.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import { followService, followerService } from '../../service/follow_service';
import usePageHandler from '../../hooks/usePageHandler';

const FollowerList = () => {
    const baseURL = 'https://api.mandarin.weniv.co.kr/';
    const token = sessionStorage.getItem('tempToken');
    const myAccountName = sessionStorage.getItem('tempAccountName');
    const [followerData, setFollowerData] = useState([]);
    const [follow, setFollow] = useState(false);
    usePageHandler('text', '팔로워');

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

    // console.log('follower:', followerData[0]);

    useEffect(() => {
        // console.log('accountname:', followerData[0]?.accountname);
        followService(baseURL, token, followerData[0]?.accountname)
            .then(data => {
                setFollow(data.profile.isfollow);
                // setFollow(!follow);
                // console.log('follower:', data);
            })
            .catch(error => {
                console.error('API 요청 중 오류 발생: ', error);
            });
    }, []);

    // console.log('follow:', follow);

    const handleFollowToggle = () => {
        setFollow(!follow);
    };

    return (
        <>
            {/* <S.FollowerHeader>
                <button>
                    <S.Backwardicon />
                </button>
                <h2>Follwer</h2>
            </S.FollowerHeader> */}
            <S.FollowerContainer>
                {followerData.map(data => (
                    <S.FollowerList>
                        <S.FollowerInfo>
                            <img src={data?.image} className="follower-img" />
                            <div>{data?.accountname}</div>
                        </S.FollowerInfo>
                        <GradientButton
                            width={'80px'}
                            onClick={handleFollowToggle}
                            gra={follow ? true : false}
                            // gra={followerData.profile.isfollow}
                        >
                            {follow ? '팔로우' : '팔로잉'}
                        </GradientButton>
                    </S.FollowerList>
                ))}
                {/* <S.FollowerList>
                    <S.FollowerInfo>
                        <img
                            src={followerData[0]?.image}
                            className="follower-img"
                        />
                        <div>{followerData[0]?.accountname}</div>
                    </S.FollowerInfo>
                    <GradientButton
                        width={'80px'}
                        onClick={handleFollowToggle}
                        gra={follow ? true : false}
                        // gra={followerData.profile.isfollow}
                    >
                        {follow ? 'follow' : 'unfollow'}
                    </GradientButton>
                </S.FollowerList> */}
            </S.FollowerContainer>
        </>
    );
};

export default FollowerList;
