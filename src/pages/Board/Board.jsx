import React from 'react';
import * as S from './Board.styled';
import GradientButton from '../../components/GradientButton/GradientButton';

const Board = () => {
    return (
        <>
            <S.BoardHeader>
                <S.BoardHeaderUser>
                    <button>
                        <S.BackIcon />
                    </button>
                    <S.ProfileImg></S.ProfileImg>
                    <div>프로필ID</div>
                </S.BoardHeaderUser>
                <GradientButton gra={true} width={'80px'} padding={'5px 0'}>
                    팔로우
                </GradientButton>
            </S.BoardHeader>
            <S.BoardMain>
                <S.ContentSection>
                    <img src="/images/puppy.jpg" alt="" className="post-img" />
                    <img src="/images/puppy.jpg" alt="" />
                    <img src="/images/puppy.jpg" alt="" />
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
                    <h2 className="user-name">프로필ID</h2>
                    <p className="main-content">
                        우리집 강아지예요 정말 귀엽죠? 이름은 해피입니다!!
                        해피라는 이름은 저희 집안에 행복을 가져다 주는 존재인것
                        같아 이름을 해피로 지었어요 ㅎㅎ
                    </p>
                    {/* <S.CommentCounter>총 x개의 댓글</S.CommentCounter> */}
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
