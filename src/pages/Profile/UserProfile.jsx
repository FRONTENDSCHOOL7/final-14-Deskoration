import React, { useEffect, useState } from 'react';
import * as S from './UserProfile.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import { getUserProfileApi } from '../../service/profile_service';
import { getMyPostApi } from '../../service/post_service';
import { Link, useParams } from 'react-router-dom';
import CommonLoading from '../Loading/CommonLoading';
import usePageHandler from '../../hooks/usePageHandler';

const UserProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [userPost, setUserPost] = useState(null);
    const [expandedContent, setExpandedContent] = useState(false);
    const { username } = useParams(); //선택한 게시물 아이디 값
    const token = sessionStorage.getItem('Token');

    usePageHandler('text', profileData?.username);

    useEffect(() => {
        // API 호출해서 데이터 받아오기
        getUserProfileApi(username, token)
            .then(data => {
                setProfileData(data.profile);
                return data.profile.accountname;
            })
            .then(name => {
                getMyPostApi(name, token).then(data => {
                    const result = data.filter(item =>
                        item.content.includes('"deskoration"'),
                    );
                    setUserPost(result);
                });
            })
            .catch(error => {
                console.error('API 요청 중 오류 발생: ', error);
            });
    }, [token, username]);

    if (profileData === null || userPost === null) {
        return <CommonLoading />;
    }

    const toggleExpandedContent = () => {
        setExpandedContent(!expandedContent);
    };

    return (
        <>
            <S.ProfileContainer>
                <S.UserInfo>
                    <img
                        src={profileData?.image}
                        alt="userImage"
                        className="user-img"
                    />

                    <div className="user-introduce">
                        <p className="user-name">{profileData?.username}</p>
                        <p className="user-info">
                            {expandedContent
                                ? profileData.intro
                                : profileData?.intro?.slice(0, 53)}
                            {profileData.intro?.length > 30 && (
                                <S.ToggleButton
                                    type="button"
                                    onClick={toggleExpandedContent}
                                >
                                    {expandedContent ? '접기' : '...더보기'}
                                </S.ToggleButton>
                            )}
                        </p>
                    </div>
                </S.UserInfo>
                <div className="gradient_btn">
                    <GradientButton
                        type={'button'}
                        gra={'true'}
                        width={'100%'}
                        padding={'10px'}
                    >
                        팔로우
                    </GradientButton>
                    <GradientButton
                        type={'button'}
                        gra={''}
                        width={'100%'}
                        padding={'10px'}
                    >
                        메시지 보내기
                    </GradientButton>
                </div>
                <S.UserDataList>
                    <button className="user-post">
                        <p>{userPost?.length}</p>
                        <p>게시물</p>
                    </button>
                    <Link to="/followerList">
                        <button className="user-follow">
                            <p>{profileData?.followerCount}</p>
                            <p>팔로워</p>
                        </button>
                    </Link>
                    <Link to="/followingList">
                        <button className="user-following">
                            <p>{profileData?.followingCount}</p>
                            <p>팔로잉</p>
                        </button>
                    </Link>
                </S.UserDataList>
                <S.UserPostings>
                    {userPost?.map((post, index) => (
                        <Link key={post.id} to={`/detailPost/${post.id}`}>
                            <img src={post.image} alt="게시물 목록" />
                        </Link>
                    ))}
                </S.UserPostings>
            </S.ProfileContainer>
            <S.MoreButton>
                <S.MoreIcon />
            </S.MoreButton>
        </>
    );
};

export default UserProfile;
