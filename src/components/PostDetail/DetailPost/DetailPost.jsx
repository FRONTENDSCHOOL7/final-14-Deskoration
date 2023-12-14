import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { openAlertModal } from '../../../features/modal/alertModalSlice';

import { deletePostAPI, reportPostAPI } from '../../../service/post_service';
import { postLikeApi, deleteLikeApi } from '../../../service/like_service';

import { Marker } from '../../Marker/Marker';
import SocialButton from '../../SocialButton/SocialButton';
import BottomSheet from '../../BottomSheet/BottomSheet';

import * as S from './DetailPost.styled';

const DetailPost = ({ data, commentData, token, id, setFocus }) => {
    const dispatch = useDispatch();
    const [likeData, setLikeData] = useState({
        isLike: data.post.hearted,
        likeCount: data.post.heartCount,
    });

    const postData = data?.post;
    const postContent = JSON.parse(data?.post?.content);

    const myId = sessionStorage.getItem('Id');

    const navigate = useNavigate();

    // 너도.. useQuery?랑 mutation
    const handleLike = () => {
        if (!likeData.isLike) {
            postLikeApi(id, token)
                .then(likeResult => {
                    setLikeData(prev => ({
                        ...prev,
                        isLike: true,
                        likeCount: likeResult.post.heartCount,
                    }));
                })
                .catch(error => {
                    console.error('error');
                });
        } else {
            deleteLikeApi(id, token)
                .then(unlikeResult => {
                    setLikeData(prev => ({
                        ...prev,
                        isLike: false,
                        likeCount: unlikeResult.post.heartCount,
                    }));
                })
                .catch(error => {
                    console.error('error');
                });
        }
    };

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
            deletePostAPI(postData.id, token);
            navigate(-1);
        }
        handlePostBottomSheet();
    };

    const reportPost = e => {
        e.stopPropagation();
        if (window.confirm('이 포스트를 신고하시겠습니까?')) {
            reportPostAPI(postData.id, token);
            dispatch(openAlertModal());
        }
        handleReportBottomSheet();
    };

    return (
        <>
            <S.DetailPostCotainer>
                <S.DetailPostMain $isBottomSheet={isPostBottomSheet}>
                    <S.ContentSection>
                        <div className="post" style={{ position: 'relative' }}>
                            <img
                                src={postData?.image}
                                alt="데스크 셋업 이미지"
                            />
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
                                <SocialButton
                                    type={'like'}
                                    onClick={handleLike}
                                    isLike={likeData.isLike}
                                    likeCount={likeData.likeCount}
                                />
                                <SocialButton
                                    type={'comment'}
                                    onClick={() => setFocus('comment')}
                                    commentCount={commentData?.length}
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
                        <div className="user-name">
                            {postData.author?.username}
                        </div>
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
            </S.DetailPostCotainer>
        </>
    );
};

export default DetailPost;
