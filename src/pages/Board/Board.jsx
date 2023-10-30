import React, { useEffect, useState } from 'react';
import * as S from './Board.styled';
import GradientButton from '../../components/GradientButton/GradientButton';
import { fetchPosts } from '../../service/board_service';

const Board = () => {
    const [postData, setPostData] = useState(null);

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
    }, []);

    return (
        <>
            <S.BoardHeader>
                <S.BoardHeaderUser>
                    <button>
                        <S.BackIcon />
                    </button>
                    <S.ProfileImg src={postData.author.image} alt="" />
                    <div className="profile-name">
                        {postData.author.username}
                    </div>
                </S.BoardHeaderUser>
                <GradientButton gra={true} width={'80px'} padding={'5px 0'}>
                    팔로우
                </GradientButton>
            </S.BoardHeader>
            <S.BoardMain>
                <S.ContentSection>
                    <div className="">
                        <img src={postData.image} alt="" className="post-img" />
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
                            <S.Dots_verticalIcon />
                        </div>
                    </div>
                    <h2 className="user-name">{postData.author.username}</h2>
                    <p className="main-content">{postData.content}</p>
                    <S.CommentSection>
                        <S.CommentCounter>
                            총 {postData.commentCount}개의 댓글
                        </S.CommentCounter>
                        <S.AComment>
                            <S.ProfileImg src={postData.author.image} alt="" />
                            <div>
                                <S.CommentID>팔로우ID</S.CommentID>
                                <S.CommentList>
                                    대애애애애앳그으으으을
                                </S.CommentList>
                            </div>
                            <S.DotsIcon />
                        </S.AComment>
                    </S.CommentSection>
                </S.ContentSection>
                <S.CommentSection>댓글창</S.CommentSection>
            </S.BoardMain>
            <S.BoardFooter>
                <S.CommentInput>
                    <input
                        type="text"
                        placeholder="메시지를 입력하세요"
                        className="input-text"
                    />
                    <button className="comment-btn">
                        <p>등록</p>
                    </button>
                </S.CommentInput>
            </S.BoardFooter>
        </>
    );
};

export default Board;
