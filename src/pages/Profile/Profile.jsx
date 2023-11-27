import React, { useEffect, useState } from 'react';
import * as S from './Profile.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import { getMyProfileApi } from '../../service/profile_service';
import { Link, useNavigate } from 'react-router-dom';
import { getMyPostApi } from '../../service/post_service';
import Loader from '../../components/Loading/Loader';
import usePageHandler from '../../hooks/usePageHandler';

import BottomSheet from '../../components/BottomSheet/BottomSheet';

const Profile = () => {
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState(null);
    const [userPost, setUserPost] = useState(null);
    const [expandedContent, setExpandedContent] = useState(false);
    const [isBottomSheet, setIsBottomSheet] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const hadleBottomSheet = () => setIsBottomSheet(!isBottomSheet);

    const token = sessionStorage.getItem('Token');
    const tempAccountName = sessionStorage.getItem('AccountName');

    const logOut = () => {
        sessionStorage.clear();
        navigate('/');
    };

    usePageHandler('text', '나의 프로필');

    useEffect(() => {
        setIsLoading(true);
        // API 호출해서 데이터 받아오기
        const fetchProfileData = getMyProfileApi(token)
            .then(data => {
                setProfileData(data.user);
            })
            .catch(error => {
                console.error('API 요청 중 오류 발생: ', error);
            });
        const fetchPostData = getMyPostApi(tempAccountName, token)
            .then(data => {
                const result = data.filter(item =>
                    item.content.includes('"deskoration"'),
                );
                setUserPost(result);
            })
            .catch(error => {
                console.error('API 요청 중 오류 발생: ', error);
            });

        Promise.all([fetchProfileData, fetchPostData]).finally(() => {
            setIsLoading(false);
        });
    }, [tempAccountName, token]);

    const toggleExpandedContent = () => {
        setExpandedContent(!expandedContent);
    };

    const moveToEditProfile = () => {
        navigate('/profileEdit');
    };

    if (isLoading) {
        return <Loader />;
    }
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
                <GradientButton
                    type={'button'}
                    gra={'true'}
                    width={'100%'}
                    padding={'10px'}
                    onClick={moveToEditProfile}
                >
                    프로필 편집
                </GradientButton>
                <S.UserDataList>
                    <button className="user-post">
                        <p>{userPost?.length}</p>
                        <p>게시물</p>
                    </button>
                    <Link to={`/followerList`}>
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
                    {userPost?.map(post => (
                        <Link key={post.id} to={`/detailPost/${post.id}`}>
                            <img src={post.image} alt="게시물 목록" />
                        </Link>
                    ))}
                </S.UserPostings>
            </S.ProfileContainer>
            <S.MoreButton onClick={hadleBottomSheet}>
                <S.MoreIcon />
            </S.MoreButton>
            <BottomSheet
                isBottomSheet={isBottomSheet}
                hadleBottomSheet={hadleBottomSheet}
                deleteFn={logOut}
                oneButton
                children={'로그아웃'}
            />
        </>
    );
};

export default Profile;
