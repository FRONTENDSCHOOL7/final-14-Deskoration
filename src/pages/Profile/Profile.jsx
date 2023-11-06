import React, { useEffect, useState } from 'react';
import * as S from './Profile.styled';
import Footer from '../../components/Footer/Footer';
import GradientButton from '../../components/GradientButton/GradientButton';
import Article from '../Home/Article';
import { GetMyProfile } from '../../service/profile_service';
import { Link, useNavigate } from 'react-router-dom';
import { GetMyPost } from '../../service/post_service';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [userPost, setUserPost] = useState(null);
    const [expandedContent, setExpandedContent] = useState(false);

    const token = sessionStorage.getItem('tempToken');
    const tempAccountName = sessionStorage.getItem('tempAccountName');
    const myId = sessionStorage.getItem('tempID');

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Use navigate to go back to the previous page
    };

    // usePageHandler('text', '나의 프로필');

    useEffect(() => {
        // API 호출해서 데이터 받아오기
        GetMyProfile(token)
            .then(data => {
                setProfileData(data.user);
                console.log(data.user);
            })
            .catch(error => {
                console.error('API 요청 중 오류 발생: ', error);
            });
        GetMyPost(tempAccountName, token)
            .then(data => {
                setUserPost(data);
                console.log(data);
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
            <S.ProfileContainer>
                <S.UserInfo>
                    <img src={profileData?.image} alt="" className="user-img" />

                    <div className="user-introduce">
                        <p className="user-name">{profileData?.accountname}</p>
                        <p className="user-info">
                            {expandedContent
                                ? profileData?.intro
                                : profileData?.intro.slice(0, 53)}
                            {profileData?.intro?.length > 30 && (
                                <button onClick={toggleExpandedContent}>
                                    {expandedContent ? '접기' : '더보기'}
                                </button>
                            )}
                        </p>
                    </div>
                </S.UserInfo>
                <GradientButton
                    type={'button'}
                    gra={'true'}
                    width={'100%'}
                    padding={'10px'}
                >
                    프로필 편집
                </GradientButton>
                <S.UserDataList>
                    <button className="user-post">
                        <p>{userPost?.length}</p>
                        <p>게시물</p>
                    </button>
                    <Link to="/followerList">
                        <button className="user-follow">
                            <p>{profileData?.followerCount}</p>
                            <p>팔로우</p>
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
                        <Link key={post.id} to={`/detailpost/${post.id}`}>
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

export default Profile;
