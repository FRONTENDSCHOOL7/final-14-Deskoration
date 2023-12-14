import React from 'react';

import { useDispatch } from 'react-redux';
import { openAlertModal } from '../../../features/modal/alertModalSlice';

import {
    getCommentApi,
    postCommentApi,
    deleteCommentApi,
    reportCommentApi,
} from '../../../service/comment_service';

import * as S from './Comment.styled';

const Comment = props => {
    const {
        commentData,
        postDataID,
        token,
        id,
        register,
        handleSubmit,
        resetField,
    } = props;
    const myId = sessionStorage.getItem('Id');
    const dispatch = useDispatch();

    // mutation으로 사용해야 돼
    const handleCommentSubmit = commentData => {
        // 새로운 댓글을 서버로 전송
        postCommentApi(id, commentData.comment, token) // postComment 함수는 새 댓글을 작성하기 위한 API 요청을 보내야 합니다
            .then(response => {
                // 새 댓글이 성공적으로 작성되면, commentData를 업데이트하거나 다시 불러오도록 구현
                getCommentApi(id, token)
                    .then(data => {
                        // setCommentData(data.comments.reverse());
                        console.log(data);
                    })
                    .catch(error => {
                        console.error('API 요청 중 오류 발생: ', error);
                    });
            })
            .catch(error => {
                console.error('댓글 작성 중 오류 발생:', error);
            });
        resetField('comment');
    };

    // mutation으로 사용해야 돼
    const deleteComment = (e, commentID) => {
        e.stopPropagation();
        if (window.confirm('이 댓글을 삭제하시겠습니까?')) {
            deleteCommentApi(postDataID, commentID, token) //
                .then(() =>
                    getCommentApi(id, token)
                        .then(data => {
                            // setCommentData(data.comments.reverse());
                            console.log(data);
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
            reportCommentApi(postDataID, commentID, token);
            dispatch(openAlertModal());
        }
    };

    return (
        <>
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
                                <span>{comment.author.username}</span>
                                <p>{comment.content}</p>
                            </div>
                        </S.CommentInfo>
                        {comment.author._id === myId ? (
                            <button onClick={e => deleteComment(e, comment.id)}>
                                삭제
                            </button>
                        ) : (
                            <button onClick={e => reportComment(e, comment.id)}>
                                신고
                            </button>
                        )}
                    </S.CommentItem>
                ))}
            </S.CommentSection>
            <S.CommentInputForm onSubmit={handleSubmit(handleCommentSubmit)}>
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
        </>
    );
};

export default Comment;
