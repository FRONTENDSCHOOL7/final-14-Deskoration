import React from 'react';
import * as S from './SocialButton.styled';

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
