import React, { useEffect, useState } from 'react';
import * as S from './DetailPost.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import { fetchPosts } from '../../service/board_service';
import { fetchcomment, postComment } from '../../service/comment_service';
const Board = () => {
    const [postData, setPostData] = useState(null);
    const [commentData, setCommentData] = useState(null);
    const [newComment, setNewComment] = useState(''); // 새로운 댓글을 저장할 상태 추가
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const myId = sessionStorage.getItem('tempID');

    useEffect(() => {
        // API 호출해서 데이터 받아오기
        fetchPosts()
            .then(data => {
                setPostData(data.post);
                console.log(data.post);
            })
            .catch(error => {
                console.error('API 요청 중 오류 발생: ', error);
            });
        fetchcomment()
            .then(data => {
                setCommentData(data.comments);
                console.log(data.comments);
            })
            .catch(error => {
                console.error('API 요청 중 오류 발생: ', error);
            });
    }, []);

    const handleCommentSubmit = () => {
        // 새로운 댓글을 서버로 전송
        postComment(newComment) // postComment 함수는 새 댓글을 작성하기 위한 API 요청을 보내야 합니다
            .then(response => {
                // 새 댓글이 성공적으로 작성되면, commentData를 업데이트하거나 다시 불러오도록 구현
                fetchcomment()
                    .then(data => {
                        setCommentData(data.comments);
                        console.log(data.comments);
                        // console.log(response);
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

    // ...

    return (
        <>
            <S.BoardHeader>
                <S.BoardHeaderUser>
                    <button>
                        <S.BackIcon />
                    </button>
                    {postData && ( // null이 아닌 경우에만 렌더링
                        <>
                            <S.ProfileImg src={postData.author.image} alt="" />
                            <div className="profile-name">
                                {postData.author.username}
                            </div>
                        </>
                    )}
                </S.BoardHeaderUser>
                <GradientButton gra={true} width={'80px'} padding={'5px 0'}>
                    팔로우
                </GradientButton>
            </S.BoardHeader>
            <S.BoardMain>
                {postData && ( // null이 아닌 경우에만 렌더링
                    <S.ContentSection>
                        <div className="">
                            <img
                                src={postData.image}
                                alt=""
                                className="post-img"
                            />
                        </div>
                        <div className="board-btn">
                            <div className="btn-hc">
                                <div>
                                    <S.LikeIcon className="like" />
                                </div>
                                <div>
                                    <S.CommentIcon />
                                </div>
                            </div>
                            <div>
                                {postData.author._id === myId && ( // post.author._id와 myId가 동일한 경우에만 보이게 함
                                    <S.Dots_verticalIcon />
                                )}
                            </div>
                        </div>

                        <h2 className="user-name">
                            {postData.author.username}
                        </h2>
                        <p className="main-content">{postData.content}</p>
                        <S.CommentSection>
                            <S.CommentCounter>
                                총 {commentData?.length}개의 댓글
                            </S.CommentCounter>
                            {commentData?.map((comment, index) => (
                                <S.AComment key={index}>
                                    <S.ProfileImg
                                        src={comment.author.image}
                                        alt=""
                                    />
                                    <div>
                                        <S.CommentID>
                                            {comment.author.username}
                                        </S.CommentID>
                                        <S.CommentList>
                                            {comment.content}
                                        </S.CommentList>
                                    </div>
                                    {comment.author._id === myId && (
                                        <div class="dropdown">
                                            <S.Dots_verticalIcon />
                                        </div>
                                    )}
                                </S.AComment>
                            ))}
                        </S.CommentSection>
                    </S.ContentSection>
                )}
            </S.BoardMain>
            <S.CommentContainer>
                <S.CommentBox>
                    <input
                        type="text"
                        placeholder="메시지를 입력하세요"
                        className="input-text"
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                    />
                    <button
                        className="comment-btn"
                        onClick={handleCommentSubmit}
                    >
                        <p>등록</p>
                    </button>
                </S.CommentBox>
            </S.CommentContainer>
        </>
    );
};

export default Board;
