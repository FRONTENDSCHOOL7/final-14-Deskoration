import React, { useEffect, useState } from 'react';
import * as S from './Feed.styled';
import usePageHandler from '../../hooks/usePageHandler';
import { getFeedApi } from '../../service/post_service';
import { Link } from 'react-router-dom';

const Feed = () => {
    const token = sessionStorage.getItem('Token');
    const [feedData, setFeedData] = useState([]);
    const [feedContent, setFeedContent] = useState([]);
    const [createDate, setCreateDate] = useState([]);
    const [likes, setLikes] = useState([]);

    usePageHandler('text', '팔로잉 피드');

    const handleLike = index => {
        const copyLikes = [...likes];
        copyLikes[index] = !copyLikes[index];
        setLikes(copyLikes);
    };

    useEffect(() => {
        getFeedApi(token)
            .then(result => {
                setFeedData(result.posts);

                const newFeedContent = [];
                const newCreateDate = [];

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
                });

                setFeedContent(newFeedContent);
                setCreateDate(newCreateDate);
            })
            .catch(error => {
                console.error('Error calling the feed API: ', error);
            });
    }, []);

    return (
        <ul>
            {feedData.map((item, index) => {
                return (
                    <S.FeedContainer key={item.id}>
                        <S.FeedItemHeader>
                            <S.UserInfoBox>
                                <Link
                                    to={`/profile/${feedData[index].author.accountname}`}
                                >
                                    <img
                                        src={item?.author.image}
                                        alt="이미지"
                                        className="profile-img"
                                    />
                                </Link>
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
                            <img src={item.image} alt="게시글 내용" />
                            <p>{feedContent[index]?.deskoration.message}</p>
                            <S.BtnBox>
                                <button
                                    type="button"
                                    onClick={() => handleLike(index)}
                                >
                                    <S.LikeIcon
                                        className={likes[index] ? 'like' : null}
                                    >
                                        좋아요
                                    </S.LikeIcon>
                                </button>
                                <button type="button">
                                    <Link
                                        to={`/detailpost/${feedData[index].id}`}
                                    >
                                        <S.CommentIcon>댓글</S.CommentIcon>
                                    </Link>
                                </button>
                            </S.BtnBox>
                            <S.FeedDate>
                                {`${createDate[index]?.year}년 ${createDate[index]?.month}월 ${createDate[index]?.date}일`}
                            </S.FeedDate>
                        </S.FeedDetailBox>
                    </S.FeedContainer>
                );
            })}
        </ul>
    );
};

export default Feed;
