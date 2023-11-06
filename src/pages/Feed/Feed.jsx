import React, { useEffect, useState } from 'react';
import * as S from './Feed.styled';
import usePageHandler from '../../hooks/usePageHandler';
import { getFollowingFeed } from '../../service/post_service';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

const Feed = () => {
    const navigate = useNavigate();
    // const { id } = useParams();
    const token = sessionStorage.getItem('tempToken');
    const [like, setLike] = useState(false);
    const [feedData, setFeedData] = useState([]);
    const [feedContent, setFeedContent] = useState([]);
    const [createDate, setCreateDate] = useState([]);

    const pathClassName = like ? 'like' : null;

    usePageHandler('text', '팔로잉 피드');

    const handleLike = () => {
        setLike(!like);
    };

    const callFeedAPI = async token => {
        const result = await getFollowingFeed(token);
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
    };
    console.log(feedData);
    console.log(feedContent);

    useEffect(() => {
        callFeedAPI(token);
    }, []);

    const moveToDetailPage = id => {
        navigate(`/detailpost/${id}`);
    };

    return (
        <S.FeedList>
            <li>
                {feedData.map((_, index) => {
                    return (
                        <S.FeedContainer key={feedData[index].id}>
                            <S.FeedItemHeader>
                                <S.UserInfoBox>
                                    <img
                                        src={feedData[index]?.author.image}
                                        alt="이미지"
                                        className="profile-img"
                                    />
                                    <div>
                                        <h4>
                                            {feedData[index]?.author.username}
                                        </h4>
                                        <p>
                                            {
                                                feedData[index]?.author
                                                    .accountname
                                            }
                                        </p>
                                    </div>
                                </S.UserInfoBox>
                                <button>
                                    <S.MoreIcon />
                                </button>
                            </S.FeedItemHeader>
                            <S.FeedDetailBox>
                                <p>{feedContent[index]?.deskoration.message}</p>
                                <img
                                    src={feedData[index]?.image}
                                    alt="게시글 내용"
                                />
                                <S.BtnBox>
                                    <button type="button" onClick={handleLike}>
                                        <S.LikeIcon className={pathClassName}>
                                            좋아요
                                        </S.LikeIcon>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            moveToDetailPage(
                                                feedContent[index]?.id,
                                            )
                                        }
                                    >
                                        <S.CommentIcon>댓글</S.CommentIcon>
                                    </button>
                                </S.BtnBox>
                                <S.FeedDate>
                                    {`${createDate[index]?.year}년 ${createDate[index]?.month}월 ${createDate[index]?.date}일`}
                                </S.FeedDate>
                            </S.FeedDetailBox>
                        </S.FeedContainer>
                    );
                })}
            </li>
        </S.FeedList>
    );
};

export default Feed;
