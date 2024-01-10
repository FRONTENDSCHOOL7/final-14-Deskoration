import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import usePageHandler from 'hooks/usePageHandler';
import { useFeedQueryData, usePostMutationData } from 'hooks/useQueryData';

import SocialButton from 'components/Like/SocialButton/SocialButton';
import Loader from 'components/common/Loading/Loader';
import Like from 'components/Like/Like';
import AlertModal from 'components/common/AlertModal/AlertModal';
import BottomSheet from 'components/common/BottomSheet/BottomSheet';
import NoContents from 'components/common/NoContents/NoContents';
import NotFoundPage from '../404/NotFoundPage';

import * as S from './Feed.styled';

const Feed = () => {
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

    // 피드 데이터 가져오기
    const { data: feedData, isLoading, error } = useFeedQueryData();

    // 신고하기
    const { reportPostMutation } = usePostMutationData();

    const reportPost = (e, postId) => {
        e.stopPropagation();
        reportPostMutation.mutate({ postId });
        handleReportBottomSheet();
    };

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
                                <Link to={`/detailPost/${post.id}`}>
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
                                    <Link to={`/detailPost/${post.id}`}>
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
