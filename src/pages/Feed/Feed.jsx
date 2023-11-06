import React, { useEffect, useState } from 'react';
import * as S from './Feed.styled';
import usePageHandler from '../../hooks/usePageHandler';
import { getFollowingFeed } from '../../service/post_service';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

const Feed = () => {
    const navigate = useNavigate();
    // const { id } = useParams();
    const token = sessionStorage.getItem('tempToken');
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
    const handleGoBack = () => {
        navigate(-1);
    };

    const callFeedAPI = async token => {
        const result = await getFollowingFeed(token);
        setFeedData(result.posts);
        console.log(result.posts);

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
    // console.log(feedData);
    // console.log(feedContent);

    useEffect(() => {
        callFeedAPI(token);
    }, []);

    // const moveToDetailPage = id => {
    //     navigate(`/detailpost/${id}`);
    // };

    return (
        <S.FeedList>
            <ul>
                {feedData.map((item, index) => {
                    return (
                        <S.FeedContainer key={item.id}>
                            <S.FeedItemHeader>
                                <S.UserInfoBox>
                                    <Link
                                        to={`/userprofile/${feedData[index].author.accountname}`}
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
                                <p>{feedContent[index]?.deskoration.message}</p>
                                <img src={item.image} alt="게시글 내용" />
                                <S.BtnBox>
                                    <button
                                        type="button"
                                        onClick={() => handleLike(index)}
                                    >
                                        <S.LikeIcon
                                            className={
                                                likes[index] ? 'like' : null
                                            }
                                        >
                                            좋아요
                                        </S.LikeIcon>
                                    </button>
                                    <button
                                        type="button"
                                        // onClick={() =>
                                        //     moveToDetailPage(
                                        //         feedData[index]?.id,
                                        //     )
                                        // }
                                    >
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
        </S.FeedList>
    );
};

export default Feed;
