import React, { useEffect, useState } from 'react';
import * as S from './FollowingList.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import {
    postFollowApi,
    getFollowingApi,
    deleteFollowApi,
} from '../../service/follow_service';
import usePageHandler from '../../hooks/usePageHandler';
import { Link, useParams } from 'react-router-dom';

const UserFollowingList = () => {
    const token = sessionStorage.getItem('Token');
    const myAccountName = sessionStorage.getItem('AccountName');
    const { username } = useParams(); //선택한 게시물 아이디 값
    const [followingData, setFollowingData] = useState([]);
    const [follow, setFollow] = useState(false);
    usePageHandler('text', '팔로잉');
    // console.log(username);

    // 팔로잉 리스트 불러오기
    useEffect(() => {
        const fetchFollowing = async () => {
            await getFollowingApi(token, username)
                .then(data => {
                    setFollowingData(data);
                })
                .catch(error => {
                    console.error('API 요청 중 오류 발생: ', error);
                });
        };
        fetchFollowing();
    }, []);

    const handleFollowToggle = async accountname => {
        const following = followingData.find(
            f => f.accountname === accountname,
        );
        if (following) {
            try {
                let updatedFollowing;
                if (following.isfollow) {
                    const response = await deleteFollowApi(token, accountname);
                    updatedFollowing = response.profile.isfollow;
                } else {
                    const response = await postFollowApi(token, accountname);
                    updatedFollowing = response.profile.isfollow;
                }
                const updatedFollowingData = followingData.map(f =>
                    f.accountname === accountname
                        ? { ...f, isfollow: updatedFollowing }
                        : f,
                );
                setFollowingData(updatedFollowingData);
                console.log(followingData);
            } catch (error) {
                console.error('API 요청 중 오류 발생:', error);
            }
        }
    };

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
                    </S.FollowingList>
                ))}
            </S.FollowingContainer>
        </>
    );
};

export default UserFollowingList;
