import React, { useEffect, useState } from 'react';
import * as S from './Feed.styled';
import usePageHandler from '../../hooks/usePageHandler';
import { getFeedApi } from '../../service/post_service';
import { postLikeApi, deleteLikeApi } from '../../service/like_service';
import { Link, useNavigate } from 'react-router-dom';
import SocialButton from '../../components/SocialButton/SocialButton';

const Feed = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('Token');
    const [feedData, setFeedData] = useState([]);
    const [feedContent, setFeedContent] = useState([]);
    const [createDate, setCreateDate] = useState([]);
    const [likesData, setLikesData] = useState([]);
    const [commentCount, setCommentCount] = useState([]);

    usePageHandler('text', '팔로잉 피드');

    useEffect(() => {
        getFeedApi(token)
            .then(result => {
                setFeedData(result.posts);
                console.log(result.posts);
                const newFeedContent = [];
                const newCreateDate = [];
                const newLikes = [];
                const newCommentCount = [];

                result.posts.forEach(post => {
                    const data = JSON.parse(post.content);
                    newFeedContent.push(data);

                    const dateObj = new Date(post.createdAt);
                    const convertDate = {
                        year: dateObj.getFullYear(),
                        month: dateObj.getMonth() + 1,
                        date: dateObj.getDate(),
                    };
                    newCreateDate.push(convertDate);
                    newLikes.push({
                        isLike: post.hearted,
                        likeCount: post.heartCount,
                    });
                    newCommentCount.push(post.commentCount);
                });

                setFeedContent(newFeedContent);
                setCreateDate(newCreateDate);
                setLikesData(newLikes);
                setCommentCount(newCommentCount);
            })
            .catch(error => {
                console.error('Error calling the feed API: ', error);
            });
    }, [token]);

    const handleLike = index => {
        const id = feedData[index].id;

        if (!likesData[index].isLike) {
            postLikeApi(id, token)
                .then(likeResult => {
                    setLikesData(likes => {
                        const newLikes = [...likes];
                        newLikes[index] = {
                            ...newLikes[index],
                            isLike: true,
                            likeCount: likeResult.post.heartCount,
                        };
                        return newLikes;
                    });
                    console.log(likeResult);
                })
                .catch(error => {
                    console.error('error');
                });
        } else {
            deleteLikeApi(id, token)
                .then(unlikeResult => {
                    setLikesData(likes => {
                        const newLikes = [...likes];
                        newLikes[index] = {
                            ...newLikes[index],
                            isLike: false,
                            likeCount: unlikeResult.post.heartCount,
                        };
                        return newLikes;
                    });
                    console.log(unlikeResult);
                })
                .catch(error => {
                    console.error('error');
                });
        }
    };

    const moveToDetailPost = id => {
        navigate(`/detailpost/${id}`);
    };

    const moveToProfile = accountname => {
        navigate(`/profile/${accountname}`);
    };
    return (
        <>
            {feedData.map((item, index) => {
                return (
                    <S.FeedContainer key={item.id}>
                        <S.FeedItemHeader>
                            <S.UserInfoBox
                                onClick={() =>
                                    moveToProfile(
                                        feedData[index].author.accountname,
                                    )
                                }
                            >
                                <img
                                    src={item?.author.image}
                                    alt="이미지"
                                    className="profile-img"
                                />
                                <div>
                                    <h4>{item?.author.username}</h4>
                                    <p>{item?.author.accountname}</p>
                                </div>
                            </S.UserInfoBox>
                            <button>
                                <S.MoreIcon />
                            </button>
                        </S.FeedItemHeader>

                        <S.FeedDetailBox>
                            <S.FeedDetailContentBox
                                onClick={() => {
                                    moveToDetailPost(feedData[index].id);
                                }}
                            >
                                <img src={item.image} alt="게시글 내용" />
                                <S.DetailMsg>
                                    {feedContent[index]?.deskoration.message}
                                </S.DetailMsg>
                            </S.FeedDetailContentBox>
                            <div>
                                <SocialButton
                                    type={'like'}
                                    onClick={() => handleLike(index)}
                                    isLike={likesData[index].isLike}
                                    likeCount={likesData[index].likeCount}
                                />
                                <SocialButton
                                    type={'comment'}
                                    onClick={() => {
                                        moveToDetailPost(feedData[index].id);
                                    }}
                                    commentCount={commentCount[index]}
                                />
                            </div>
                            <S.FeedDate>
                                {`${createDate[index]?.year}년 ${createDate[index]?.month}월 ${createDate[index]?.date}일`}
                            </S.FeedDate>
                        </S.FeedDetailBox>
                    </S.FeedContainer>
                );
            })}
        </>
    );
};

export default Feed;
