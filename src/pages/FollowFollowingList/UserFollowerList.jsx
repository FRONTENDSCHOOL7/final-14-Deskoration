import React, { useEffect, useState } from 'react';
import * as S from './FollowerList.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import {
    postFollowApi,
    deleteFollowApi,
    getFollowerApi,
} from '../../service/follow_service';
import usePageHandler from '../../hooks/usePageHandler';
import { Link, useParams } from 'react-router-dom';

const UserFollowerList = () => {
    const token = sessionStorage.getItem('Token');
    const myAccountName = sessionStorage.getItem('AccountName');
    const { username } = useParams(); //선택한 게시물 아이디 값
    const [followerData, setFollowerData] = useState([]);
    const [follow, setFollow] = useState(false);
    usePageHandler('text', '팔로워');
    console.log(username);

    // 팔로워 리스트 불러오기
    useEffect(() => {
        getFollowerApi(token, username)
            .then(data => {
                setFollowerData(data);
            })
            .catch(error => {
                console.error('API 요청 중 오류 발생: ', error);
            });
    }, []);

    const handleFollowToggle = async accountname => {
        const follower = followerData.find(f => f.accountname === accountname);
        if (follower) {
            try {
                let updatedFollow;
                if (follower.isfollow) {
                    const response = await deleteFollowApi(token, accountname);
                    updatedFollow = response.profile.isfollow;
                } else {
                    const response = await postFollowApi(token, accountname);
                    updatedFollow = response.profile.isfollow;
                }
                const updatedFollowerData = followerData.map(f =>
                    f.accountname === accountname
                        ? { ...f, isfollow: updatedFollow }
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
