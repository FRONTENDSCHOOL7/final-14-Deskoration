import React, { useEffect, useState } from 'react';
import * as S from './Feed.styled';
import usePageHandler from '../../hooks/usePageHandler';
import { getFeedApi, reportPostAPI } from '../../service/post_service';
import { postLikeApi, deleteLikeApi } from '../../service/like_service';
import { Link } from 'react-router-dom';
import SocialButton from '../../components/SocialButton/SocialButton';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import { openAlertModal } from '../../features/modal/alertModalSlice';
import AlertModal from '../../components/AlertModal/AlertModal';
import Loader from '../../components/Loading/Loader';
const Feed = () => {
    const dispatch = useDispatch();
    const token = sessionStorage.getItem('Token');
    const [feedData, setFeedData] = useState([]);
    const [feedContent, setFeedContent] = useState([]);
    const [createDate, setCreateDate] = useState([]);
    const [likesData, setLikesData] = useState([]);
    const [commentCount, setCommentCount] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // 신고후에 보여줄 alertModal message
    const [reportMessage, setReportMessage] = useState('');
    const { isOpen } = useSelector(store => store.alertModal);

    // 신고하기를 위한 postId
    const [postId, setPostId] = useState();

    // 신고하기 bootomsheet
    const [isReportBottomSheet, setIsReportBottomSheet] = useState(false);
    const handleReportBottomSheet = itemId => {
        setPostId(itemId);
        setIsReportBottomSheet(!isReportBottomSheet);
    };

    // 신고하기
    const reportPost = e => {
        e.stopPropagation();
        reportPostAPI(postId, token) //
            .then(result => {
                if (result.message === '존재하지 않는 게시글입니다.') {
                    setReportMessage('게시글을 찾을 수 없습니다.');
                    dispatch(openAlertModal());
                } else {
                    setReportMessage('신고가 완료되었습니다.');
                    dispatch(openAlertModal());
                }
            })
            .catch(error => {
                console.error(error);
            });
        handleReportBottomSheet();
    };

    usePageHandler('text', '팔로잉 피드');

    useEffect(() => {
        setIsLoading(true);
        getFeedApi(token)
            .then(result => {
                setFeedData(result.posts);
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
            })
            .finally(() => setIsLoading(false));
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

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            {feedData.map((item, index) => {
                return (
                    <S.FeedContainer key={item.id}>
                        <S.FeedItemHeader>
                            <Link
                                to={`/profile/${feedData[index].author.accountname}`}
                            >
                                <S.UserInfoBox>
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
                            </Link>
                            <button
                                onClick={() => handleReportBottomSheet(item.id)}
                            >
                                <S.MoreIcon />
                            </button>
                        </S.FeedItemHeader>

                        <S.FeedDetailBox>
                            <Link to={`/detailpost/${feedData[index].id}`}>
                                <S.DetailImgBox>
                                    <img src={item.image} alt="게시글 이미지" />
                                </S.DetailImgBox>
                                <S.DetailMsg>
                                    {feedContent[index]?.deskoration.message}
                                </S.DetailMsg>
                            </Link>
                            <div>
                                <SocialButton
                                    type={'like'}
                                    onClick={() => handleLike(index)}
                                    isLike={likesData[index].isLike}
                                    likeCount={likesData[index].likeCount}
                                />
                                <Link to={`/detailpost/${feedData[index].id}`}>
                                    <SocialButton
                                        type={'comment'}
                                        commentCount={commentCount[index]}
                                    />
                                </Link>
                            </div>
                            <S.FeedDate>
                                {`${createDate[index]?.year}년 ${createDate[index]?.month}월 ${createDate[index]?.date}일`}
                            </S.FeedDate>
                        </S.FeedDetailBox>
                    </S.FeedContainer>
                );
            })}
            <BottomSheet
                isBottomSheet={isReportBottomSheet}
                hadleBottomSheet={handleReportBottomSheet}
                oneButton
                children={'신고하기'}
                deleteFn={e => reportPost(e)}
            />
            {isOpen && <AlertModal alert={reportMessage} />}
        </>
    );
};

export default Feed;
