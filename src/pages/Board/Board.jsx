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
            <S.CommentSection>
                <S.CommentCounter>총 x개의 댓글</S.CommentCounter>
                댓글창
            </S.CommentSection>
        </>
    );
};

export default Board;
