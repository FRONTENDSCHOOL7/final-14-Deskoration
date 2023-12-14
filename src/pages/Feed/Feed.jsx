import React, { useState } from 'react';
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Feed = () => {
    const dispatch = useDispatch();
    const token = sessionStorage.getItem('Token');
    const queryClient = useQueryClient();
    const queryKey = ['getFeedApi', token];
    // header dispatch
    usePageHandler('text', '팔로잉 피드');

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
    const reportMutation = useMutation({
        mutationFn: ({ postId, token }) => {
            reportPostAPI(postId, token);
        },
        onSuccess: () => {
            setReportMessage('신고가 완료되었습니다.');
            dispatch(openAlertModal());
        },
        onError: error => console.error(error),
    });

    const reportPost = (e, postId, token) => {
        e.stopPropagation();
        reportMutation.mutate({ postId, token });
        handleReportBottomSheet();
    };

    // 피드 데이터 가져오기
    const {
        data: feedData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: queryKey,
        queryFn: () => getFeedApi(token),
        select: responseData =>
            responseData.posts.map(post => {
                const content = JSON.parse(post.content);
                const createdAt = {
                    year: new Date(post.createdAt).getFullYear(),
                    month: new Date(post.createdAt).getMonth() + 1,
                    date: new Date(post.createdAt).getDate(),
                };
                return { ...post, content: content, createdAt: createdAt };
            }),
    });

    // 좋아요 데이터 전송하기
    const useLikeUpdate = (queryKey, isLike) => {
        return useMutation({
            mutationFn: ({ id, token }) =>
                isLike ? postLikeApi(id, token) : deleteLikeApi(id, token),
            onMutate: async ({ id }) => {
                await queryClient.cancelQueries(queryKey);
                const previousFeedData = queryClient.getQueryData(queryKey);

                queryClient.setQueryData(queryKey, oldData => {
                    return {
                        ...oldData,
                        posts: oldData.posts.map(post => {
                            if (post.id === id) {
                                return {
                                    ...post,
                                    hearted: isLike,
                                    heartCount: isLike
                                        ? post.heartCount + 1
                                        : post.heartCount - 1,
                                };
                            }
                            return post;
                        }),
                    };
                });
                return { previousFeedData };
            },
            onError: (error, _, context) => {
                queryClient.setQueryData(queryKey, context.previousFeedData);
                console.error('다시 시도해주세요.', error);
            },
            onSettled: () => {
                queryClient.invalidateQueries(queryKey);
            },
        });
    };

    const likeMutation = useLikeUpdate(queryKey, true);
    const unLikeMutation = useLikeUpdate(queryKey, false);

    if (isError) {
        console.error(error);
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            {feedData.map(post => {
                const mutationParams = {
                    id: post.id,
                    token: token,
                };
                return (
                    <S.FeedContainer key={post.id}>
                        <S.FeedItemHeader>
                            <Link to={`/profile/${post.author.accountname}`}>
                                <S.UserInfoBox>
                                    <img
                                        src={post.author.image}
                                        alt="이미지"
                                        className="profile-img"
                                    />
                                    <div>
                                        <h4>{post.author.username}</h4>
                                        <p>{post.author.accountname}</p>
                                    </div>
                                </S.UserInfoBox>
                            </Link>
                            <button
                                onClick={() => handleReportBottomSheet(post.id)}
                            >
                                <S.MoreIcon />
                            </button>
                        </S.FeedItemHeader>

                        <S.FeedDetailBox>
                            <Link to={`/detailpost/${post.id}`}>
                                <S.DetailImgBox>
                                    <img src={post.image} alt="게시글 이미지" />
                                </S.DetailImgBox>
                                <S.DetailMsg>
                                    {post.content.deskoration.message}
                                </S.DetailMsg>
                            </Link>
                            <div>
                                <SocialButton
                                    type={'like'}
                                    onClick={() =>
                                        !post.hearted
                                            ? likeMutation.mutate(
                                                  mutationParams,
                                              )
                                            : unLikeMutation.mutate(
                                                  mutationParams,
                                              )
                                    }
                                    isLike={post.hearted}
                                    likeCount={post.heartCount}
                                />
                                <Link to={`/detailpost/${post.id}`}>
                                    <SocialButton
                                        type={'comment'}
                                        commentCount={post.commentCount}
                                    />
                                </Link>
                            </div>
                            <S.FeedDate>
                                {`${post.createdAt.year}년 ${post.createdAt.month}월 ${post.createdAt.date}일`}
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
                deleteFn={e => reportPost(e, postId, token)}
            />
            {isOpen && <AlertModal alert={reportMessage} />}
        </>
    );
};

export default Feed;
