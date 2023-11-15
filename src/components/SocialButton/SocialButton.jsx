import React from 'react';
import * as S from './SocialButton.styled';

// 좋아요, 댓글 버튼 컴포넌트
const SocialButton = ({ type, onClick, isLike, likeCount, commentCount }) => {
    return (
        <button type="button" onClick={onClick}>
            {type === 'like' ? (
                <S.LikeIcon className={isLike ? 'like' : null} />
            ) : type === 'comment' ? (
                <S.CommentIcon />
            ) : null}
            <S.CountSpan>
                {type === 'like'
                    ? likeCount
                    : type === 'comment'
                    ? commentCount
                    : null}
            </S.CountSpan>
        </button>
    );
};

export default SocialButton;
