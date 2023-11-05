import React, { useState } from 'react';
import * as S from './Feed.styled';
import usePageHandler from '../../hooks/usePageHandler';

const Feed = () => {
    const [like, setLike] = useState(false);
    usePageHandler('text', '팔로잉 피드');

    const handleLike = () => {
        setLike(!like);
    };

    const pathClassName = like ? 'like' : null;

    return (
        <ul>
            <li>
                <S.FeedContainer>
                    <img src="" alt="이미지" className="profile-img" />
                    <S.ContentBox>
                        <S.UserInfoBox>
                            <div>
                                <h4 className="user-name">사용자 이름</h4>
                                <p className="user-id">사용자 계정</p>
                            </div>
                            <button>
                                <S.MoreIcon />
                            </button>
                        </S.UserInfoBox>
                        <S.FeedDetailBox>
                            <p>
                                옷을 인생을 그러므로 없으면 것은 이상은 것은
                                우리의 위하여, 뿐이다. 이상의 청춘의 뼈 따뜻한
                                그들의 그와 약동하다. 대고, 못할 넣는 풍부하게
                                뛰노는 인생의 힘있다.
                            </p>
                            <img src="" alt="게시글 내용" />
                            <S.BtnBox>
                                <button onClick={handleLike}>
                                    <S.LikeIcon className={pathClassName}>
                                        좋아요
                                    </S.LikeIcon>
                                </button>
                                <button>
                                    <S.CommentIcon>댓글</S.CommentIcon>
                                </button>
                            </S.BtnBox>
                        </S.FeedDetailBox>
                        <S.FeedDate>2023년 11월 5일</S.FeedDate>
                    </S.ContentBox>
                </S.FeedContainer>
            </li>
        </ul>
    );
};

export default Feed;
