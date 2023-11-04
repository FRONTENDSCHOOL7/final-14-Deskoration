import React, { useEffect, useState } from 'react';
import * as S from './FollowerList.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import { followService } from '../../service/follow_service';

const FollowerList = () => {
    const [followerData, setFollowerData] = useState(null);

    useEffect(() => {
        followService()
            .then(data => {
                setFollowerData(data);
                // console.log('follower:', data);
            })
            .catch(error => {
                console.error('API 요청 중 오류 발생: ', error);
            });
    }, []);

    console.log('follower:', followerData);

    return (
        <>
            <S.FollowerHeader>
                <button>
                    <S.Backwardicon />
                </button>
                <h2>Follwer</h2>
            </S.FollowerHeader>
            <S.FollwerContainer>
                <S.FollwerList>
                    <S.FollowerInfo>
                        <img src="" className="follower-img" />
                        <div>followerID</div>
                    </S.FollowerInfo>
                    <GradientButton padding={'10px'}>follow</GradientButton>
                </S.FollwerList>
            </S.FollwerContainer>
        </>
    );
};

export default FollowerList;
