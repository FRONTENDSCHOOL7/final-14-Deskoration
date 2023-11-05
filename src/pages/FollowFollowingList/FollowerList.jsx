import React, { useEffect, useState } from 'react';
import * as S from './FollowerList.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import { followService } from '../../service/follow_service';
import usePageHandler from '../../hooks/usePageHandler';

const FollowerList = () => {
    const [followerData, setFollowerData] = useState(null);
    usePageHandler('text', '팔로워');

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
