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
} from '../../service/comment_service';
import { useNavigate, useParams } from 'react-router-dom';
import { Marker } from '../../components/Marker/Marker';
import SocialButton from '../../components/SocialButton/SocialButton';

import BottomSheet from '../../components/BottomSheet/BottomSheet';

import usePageHandler from '../../hooks/usePageHandler';

const DetailPost = () => {
    const [postData, setPostData] = useState(null);
    const [postContent, setPostContent] = useState('');
    const [commentData, setCommentData] = useState(null);
    const [newComment, setNewComment] = useState(''); // 새로운 댓글을 저장할 상태 추가
    const [likeData, setLikeData] = useState({});

    const token = sessionStorage.getItem('Token');
    const myId = sessionStorage.getItem('Id');
    const { id } = useParams(); //선택한 게시물 아이디 값
    const navigate = useNavigate();

    const inputRef = useRef(null);

    useEffect(() => {
        detialPostApi(id, token)
            .then(postResult => {
                setPostContent(JSON.parse(postResult.post.content));
                setPostData(postResult.post);
                setLikeData(prev => ({
                    ...prev,
                    isLike: postResult.post.hearted,
                    likeCount: postResult.post.heartCount,
                }));
            })
            .catch(error => {
                console.error('error');
            });
        getCommentApi(id, token)
            .then(commentResult => {
                setCommentData(commentResult.comments.reverse());
            })
            .catch(error => {
                console.error('error');
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

    const handleFocus = () => {
        inputRef.current.focus();
    };

    const handleCommentSubmit = () => {
        // 새로운 댓글을 서버로 전송
        postCommentApi(id, newComment, token) // postComment 함수는 새 댓글을 작성하기 위한 API 요청을 보내야 합니다
            .then(response => {
                // 새 댓글이 성공적으로 작성되면, commentData를 업데이트하거나 다시 불러오도록 구현
                getCommentApi(id, token)
                    .then(data => {
                        setCommentData(data.comments.reverse());
                    })
                    .catch(error => {
                        console.error('API 요청 중 오류 발생: ', error);
                    });
                // 새로운 댓글 상태 초기화
                setNewComment('');
            })
            .catch(error => {
                console.error('댓글 작성 중 오류 발생:', error);
            });
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
        postData?.author.image,
        postData?.author.username,
        postData?.author.accountname,
    );

    const editPost = e => {
        e.stopPropagation();
        console.log('edit post');
    };

    const deletePost = e => {
        e.stopPropagation();
        if (window.confirm('삭제하시겠습니까?')) {
            deletePostAPI(postData.id, token);
            navigate(-1);
        }
        handlePostBottomSheet();
    };

    const reportPost = e => {
        e.stopPropagation();
        if (window.confirm('신고하시겠습니까?')) {
            reportPostAPI(postData.id, token);
        }
        handleReportBottomSheet();
    };

    const deleteComment = (e, commentID) => {
        e.stopPropagation();
        if (window.confirm('삭제하시겠습니까?')) {
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
                                    {postContent?.deskoration.productItems?.map(
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
                                            onClick={handleFocus}
                                            commentCount={commentData?.length}
                                        />
                                    </div>

                                    {postData.author._id === myId ? (
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
                                    {postData.author.username}
                                </div>
                                <p>{postContent?.deskoration.message}</p>
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
                                            <button>신고</button>
                                        )}
                                    </S.CommentItem>
                                ))}
                            </S.CommentSection>
                        </>
                    )}
                </S.DetailPostMain>
                <S.CommentInputContainer>
                    <S.CommentInputBox>
                        <input
                            type="text"
                            ref={inputRef}
                            placeholder="메시지를 입력하세요"
                            className="input-text"
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                        />
                        <S.CommentButton onClick={handleCommentSubmit}>
                            등록
                        </S.CommentButton>
                    </S.CommentInputBox>
                </S.CommentInputContainer>

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
