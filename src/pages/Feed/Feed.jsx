import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';

import { getFeedAPI, reportPostAPI } from '../../service/post_service';

import { openAlertModal } from '../../features/modal/alertModalSlice';

import usePageHandler from '../../hooks/usePageHandler';
import SocialButton from '../../components/SocialButton/SocialButton';
import Loader from '../../components/Loading/Loader';
import AlertModal from '../../components/AlertModal/AlertModal';
import Like from '../../components/Like/Like';
import NotFoundPage from '../404/NotFoundPage';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import NoContents from '../../components/NoContents/NoContents';

import * as S from './Feed.styled';

const Feed = () => {
    const dispatch = useDispatch();
    const queryKey = ['getFeed'];

    // header dispatch
    usePageHandler('text', '팔로잉 피드');

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
        mutationFn: ({ postId }) => reportPostAPI(postId),
        onSuccess: data => {
            if (data.message === '존재하지 않는 게시글입니다.') {
                dispatch(openAlertModal('게시글을 찾을 수 없습니다.'));
            } else {
                dispatch(openAlertModal('신고가 완료되었습니다.'));
            }
        },
    });

    const reportPost = (e, postId) => {
        e.stopPropagation();
        reportMutation.mutate({ postId });
        handleReportBottomSheet();
    };

    // 피드 데이터 가져오기
    const {
        data: feedData,
        isLoading,
        error,
    } = useQuery({
        queryKey: queryKey,
        queryFn: () => getFeedAPI(),
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

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            {feedData.length > 0 ? (
                feedData.map(post => {
                    const mutationParams = {
                        id: post.id,
                    };
                    return (
                        <S.FeedContainer key={post.id}>
                            <S.FeedItemHeader>
                                <Link
                                    to={`/profile/${post.author.accountname}`}
                                >
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
                                    onClick={() =>
                                        handleReportBottomSheet(post.id)
                                    }
                                >
                                    <S.MoreIcon />
                                </button>
                            </S.FeedItemHeader>

                            <S.FeedDetailBox>
                                <Link to={`/detailpost/${post.id}`}>
                                    <S.DetailImgBox>
                                        <img
                                            src={post.image}
                                            alt="게시글 이미지"
                                        />
                                    </S.DetailImgBox>
                                    <S.DetailMsg>
                                        {post.content.deskoration.message}
                                    </S.DetailMsg>
                                </Link>
                                <div>
                                    <Like
                                        queryKey={queryKey}
                                        isLike={post.hearted}
                                        likeCount={post.heartCount}
                                        mutationParams={mutationParams}
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
                })
            ) : (
                <NoContents
                    mainTxt={'아직 표시할 게시글이 없습니다!'}
                    subTxt={'다른 유저를 팔로우 해보세요.'}
                />
            )}

            <BottomSheet
                isBottomSheet={isReportBottomSheet}
                hadleBottomSheet={handleReportBottomSheet}
                oneButton
                children={'신고하기'}
                deleteFn={e => reportPost(e, postId)}
            />
            <AlertModal />
            {error && <NotFoundPage />}
        </>
    );
};

export default Feed;
