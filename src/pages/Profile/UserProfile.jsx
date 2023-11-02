import React, { useEffect, useState } from 'react';
import * as S from './UserProfile.styled';
import Footer from '../../components/Footer/Footer';
import GradientButton from '../../components/GradientButton/GradientButton';
import { GetUserProfile } from '../../service/profile_service';
import { fetchPosts } from '../../service/board_service';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [userPost, setUserPost] = useState(null);
    const [expandedContent, setExpandedContent] = useState(false);

    useEffect(() => {
        // API 호출해서 데이터 받아오기
        GetUserProfile()
            .then(data => {
                setProfileData(data.profile);
                // setotherAccountname(data.profile.accountname);
                // console.log(data.profile);
                return data.profile.accountname;
            })
            .then(temp => {
                fetchPosts(temp).then(data => {
                    setUserPost(data.post);
                    // console.log(data.post);
                });
            })
            .catch(error => {
                console.error('API 요청 중 오류 발생: ', error);
            });
    }, []);

    if (profileData === null || userPost === null) {
        return <div>Loading...</div>;
    }

    const toggleExpandedContent = () => {
        setExpandedContent(!expandedContent);
    };

    return (
        <>
            <S.ProfileHeader>
                <button>
                    <S.Backwardicon />
                </button>
                <h2>{profileData.accountname}</h2>
            </S.ProfileHeader>
            <S.ProfileContainer>
                <S.UserInfo>
                    <img src={profileData.image} alt="" className="user-img" />

                    <div className="user-introduce">
                        <p className="user-name">{profileData.accountname}</p>
                        <p className="user-info">
                            {expandedContent
                                ? profileData.intro
                                : profileData.intro.slice(0, 53)}
                            {profileData.intro.length > 30 && (
                                <button onClick={toggleExpandedContent}>
                                    {expandedContent ? '접기' : '더보기'}
                                </button>
                            )}
                        </p>
                    </div>
                </S.UserInfo>
                <div className="gradient_btn">
                    <GradientButton
                        type={'button'}
                        gra={'true'}
                        width={'310px'}
                        padding={'10px'}
                    >
                        팔로우
                    </GradientButton>
                    <GradientButton
                        type={'button'}
                        gra={''}
                        width={'310px'}
                        padding={'10px'}
                    >
                        메시지 보내기
                    </GradientButton>
                </div>
                <S.UserDataList>
                    <button className="user-post">
                        <p>{userPost.length}</p>
                        <p>게시물</p>
                    </button>
                    <Link to="/follow-following-list">
                        <button className="user-follow">
                            <p>{profileData.followerCount}</p>
                            <p>팔로우</p>
                        </button>
                    </Link>
                    <Link to="/follow-following-list">
                        <button className="user-following">
                            <p>{profileData.followingCount}</p>
                            <p>팔로잉</p>
                        </button>
                    </Link>
                </S.UserDataList>
                <S.UserPostings>
                    {userPost.map((post, index) => (
                        <img key={index} src={post.image} alt="게시물 목록" />
                    ))}
                </S.UserPostings>
            </S.ProfileContainer>
            <Footer />
        </>
    );
};

export default UserProfile;
