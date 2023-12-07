import React, { useEffect, useRef, useState } from 'react';
import * as S from './DetailPost.styled';
import {
    deletePostAPI,
    detialPostApi,
    reportPostAPI,
} from '../../service/post_service';
import { postLikeApi, deleteLikeApi } from '../../service/like_service';
import {
    getCommentApi,
    postCommentApi,
    deleteCommentApi,
    reportCommentApi,
} from '../../service/comment_service';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Marker } from '../../components/Marker/Marker';
import SocialButton from '../../components/SocialButton/SocialButton';
import Loader from '../../components/Loading/Loader';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import usePageHandler from '../../hooks/usePageHandler';
import AlertModal from '../../components/AlertModal/AlertModal';

import { useDispatch } from 'react-redux';
import { openAlertModal } from '../../features/modal/alertModalSlice';

const DetailPost = () => {
    const dispatch = useDispatch();
    const [postData, setPostData] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [commentData, setCommentData] = useState(null);
    const [likeData, setLikeData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const token = sessionStorage.getItem('Token');
    const myId = sessionStorage.getItem('Id');
    const { id } = useParams(); //선택한 게시물 아이디 값
    const navigate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, reset, setFocus } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            comment: '',
        },
    });

    useEffect(() => {
        setIsLoading(true);
        const fetchDetailPostData = detialPostApi(id, token)
            .then(postResult => {
                setPostContent(JSON.parse(postResult.post.content));
                setPostData(postResult.post);
                // console.log(JSON.parse(postResult.post.content));
                setLikeData(prev => ({
                    ...prev,
                    isLike: postResult.post.hearted,
                    likeCount: postResult.post.heartCount,
                }));
            })
            .catch(error => {
                console.error('error');
            });
        const fetchCommentData = getCommentApi(id, token)
            .then(commentResult => {
                setCommentData(commentResult.comments.reverse());
            })
            .catch(error => {
                console.error('error');
            });

        Promise.all([fetchDetailPostData, fetchCommentData]).finally(() => {
            setIsLoading(false);
        });
    }, [id, token]);

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

    const handleCommentSubmit = commentData => {
        // 새로운 댓글을 서버로 전송
        postCommentApi(id, commentData.comment, token) // postComment 함수는 새 댓글을 작성하기 위한 API 요청을 보내야 합니다
            .then(response => {
                // 새 댓글이 성공적으로 작성되면, commentData를 업데이트하거나 다시 불러오도록 구현
                getCommentApi(id, token)
                    .then(data => {
                        setCommentData(data.comments.reverse());
                    })
                    .catch(error => {
                        console.error('API 요청 중 오류 발생: ', error);
                    });
            })
            .catch(error => {
                console.error('댓글 작성 중 오류 발생:', error);
            });
        reset();
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

    usePageHandler(
        'user',
        postData?.author?.image,
        postData?.author?.username,
        postData?.author?.accountname,
    );

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

    const deleteComment = (e, commentID) => {
        e.stopPropagation();
        if (window.confirm('이 댓글을 삭제하시겠습니까?')) {
            deleteCommentApi(postData.id, commentID, token) //
                .then(() =>
                    getCommentApi(id, token)
                        .then(data => {
                            setCommentData(data.comments.reverse());
                        })
                        .catch(error => {
                            console.error('API 요청 중 오류 발생: ', error);
                        }),
                );
        }
    };

    const reportComment = (e, commentID) => {
        e.stopPropagation();
        if (window.confirm('이 댓글을 신고하시겠습니까?')) {
            reportCommentApi(postData.id, commentID, token);
            dispatch(openAlertModal());
        }
    };

    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
            <S.DetailPostCotainer>
                <S.DetailPostMain $isBottomSheet={isPostBottomSheet}>
                    {postData && ( // null이 아닌 경우에만 렌더링
                        <>
                            <S.ContentSection>
                                <div
                                    className="post"
                                    style={{ position: 'relative' }}
                                >
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
                                        <button
                                            onClick={handleReportBottomSheet}
                                        >
                                            <S.Dots_verticalIcon />
                                        </button>
                                    )}
                                </S.ContentButtonBox>
                                <div className="user-name">
                                    {postData.author?.username}
                                </div>
                                <p>{postContent?.deskoration?.message}</p>
                            </S.ContentSection>

                            <S.CommentSection>
                                <S.CommentCounter>
                                    총 {commentData?.length}개의 댓글
                                </S.CommentCounter>
                                {commentData?.map((comment, index) => (
                                    <S.CommentItem key={index}>
                                        <S.CommentInfo>
                                            <S.ProfileImg
                                                src={comment.author.image}
                                                alt="사용자 이미지"
                                            />
                                            <div>
                                                <span>
                                                    {comment.author.username}
                                                </span>
                                                <p>{comment.content}</p>
                                            </div>
                                        </S.CommentInfo>
                                        {comment.author._id === myId ? (
                                            <button
                                                onClick={e =>
                                                    deleteComment(e, comment.id)
                                                }
                                            >
                                                삭제
                                            </button>
                                        ) : (
                                            <button
                                                onClick={e =>
                                                    reportComment(e, comment.id)
                                                }
                                            >
                                                신고
                                            </button>
                                        )}
                                    </S.CommentItem>
                                ))}
                            </S.CommentSection>
                        </>
                    )}
                </S.DetailPostMain>
                <S.CommentInputForm
                    onSubmit={handleSubmit(handleCommentSubmit)}
                >
                    <S.CommentInputBox>
                        <input
                            type="text"
                            placeholder="메시지를 입력하세요"
                            className="input-text"
                            {...register('comment')}
                        />
                        <S.CommentButton>등록</S.CommentButton>
                    </S.CommentInputBox>
                </S.CommentInputForm>

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
                <AlertModal alert={'신고가 완료되었습니다.'} />
            </S.DetailPostCotainer>
        </>
    );
};

export default DetailPost;
