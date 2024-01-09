import React from 'react';
import * as S from './SocialButton.styled';

// 좋아요, 댓글 버튼 컴포넌트
const SocialButton = ({ type, onClick, isLike, likeCount, commentCount }) => {
    return (
        <S.SocialButton type="button" onClick={onClick}>
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
        </S.SocialButton>
    );
};

export default SocialButton;
