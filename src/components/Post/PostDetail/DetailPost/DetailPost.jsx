import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deletePostAPI } from 'service/post_service';

import { useProfileQueryData, usePostMutationData } from 'hooks/useQueryData';
import Marker from '../../Marker/Marker';
import SocialButton from 'components//Like/SocialButton/SocialButton';
import BottomSheet from 'components/common/BottomSheet/BottomSheet';
import Like from 'components/Like/Like';

import * as S from './DetailPost.styled';

const DetailPost = ({ postData, commentLength, postId, setFocus }) => {
    const postContent = JSON.parse(postData.content);
    const mutationParams = {
        id: postData.id,
    };

    const { data: profileData } = useProfileQueryData(true);
    const { reportPostMutation } = usePostMutationData();

    const myId = profileData?._id;

    const navigate = useNavigate();

    // bottomsheet
    const [isPostBottomSheet, setIsPostBottomSheet] = useState(false);
    const handlePostBottomSheet = () => {
        setIsPostBottomSheet(!isPostBottomSheet);
    };

    const [isReportBottomSheet, setIsReportBottomSheet] = useState(false);
    const handleReportBottomSheet = () => {
        setIsReportBottomSheet(!isReportBottomSheet);
    };

    const editPost = e => {
        e.stopPropagation();
        if (window.confirm('게시물을 수정 하시겠습니까?')) {
            navigate(`/postEdit/${postData.id}`, { state: { postData } });
        }
    };

    const deletePost = e => {
        e.stopPropagation();
        if (window.confirm('이 포스트를 삭제하시겠습니까?')) {
            deletePostAPI(postData.id);
            navigate(-1);
        }
        handlePostBottomSheet();
    };

    const reportPost = e => {
        e.stopPropagation();
        if (window.confirm('이 포스트를 신고하시겠습니까?')) {
            reportPostMutation.mutate({ postId });
        }
        handleReportBottomSheet();
    };
    return (
        <S.DetailPostContainer>
            <S.DetailPostMain $isBottomSheet={isPostBottomSheet}>
                <S.ContentSection>
                    <div>
                        <img src={postData?.image} alt="데스크 셋업 이미지" />
                        {postContent?.deskoration?.productItems?.map(
                            (item, index) => (
                                <Marker
                                    key={index}
                                    itemCount={index}
                                    markerLocation={{
                                        left: item.marker.x,
                                        top: item.marker.y,
                                    }}
                                    productItem={item}
                                    isDetail={true}
                                />
                            ),
                        )}
                    </div>

                    <S.ContentButtonBox>
                        <div>
                            <Like
                                queryKey={['getDetailPost', postId]}
                                isLike={postData.hearted}
                                likeCount={postData.heartCount}
                                mutationParams={mutationParams}
                            />
                            <SocialButton
                                type={'comment'}
                                onClick={() => setFocus('comment')}
                                commentCount={commentLength}
                            />
                        </div>

                        {postData.author?._id === myId ? (
                            <button onClick={handlePostBottomSheet}>
                                <S.Dots_verticalIcon />
                            </button>
                        ) : (
                            <button onClick={handleReportBottomSheet}>
                                <S.Dots_verticalIcon />
                            </button>
                        )}
                    </S.ContentButtonBox>
                    <div className="user-name">{postData.author?.username}</div>
                    <p>{postContent?.deskoration?.message}</p>
                </S.ContentSection>
            </S.DetailPostMain>
            <BottomSheet
                isBottomSheet={isPostBottomSheet}
                hadleBottomSheet={handlePostBottomSheet}
                editFn={e => editPost(e)}
                deleteFn={e => deletePost(e)}
            />
            <BottomSheet
                isBottomSheet={isReportBottomSheet}
                hadleBottomSheet={handleReportBottomSheet}
                oneButton
                children={'신고하기'}
                deleteFn={e => reportPost(e)}
            />
        </S.DetailPostContainer>
    );
};

export default DetailPost;
