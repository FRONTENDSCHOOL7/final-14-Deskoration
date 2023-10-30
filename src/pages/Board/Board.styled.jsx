import styled from 'styled-components';
import { ReactComponent as Back } from '../../assets/images/Backward.svg';
import theme from '../../styles/theme';
import { ReactComponent as Dots } from '../../assets/images/Dots.svg';
import { ReactComponent as Like } from '../../assets/images/Like.svg';
import { ReactComponent as Comment } from '../../assets/images/Comment.svg';
import { ReactComponent as Dots_vertical } from '../../assets/images/Dots_vertical.svg';

export const LikeIcon = styled(Like)``;
export const CommentIcon = styled(Comment)``;
export const Dots_verticalIcon = styled(Dots_vertical)``;

// 댓글창 헤더
export const BoardHeader = styled.header`
    display: flex;
    justify-content: space-between;

    align-items: center;
    height: 70px;
    margin: 0 25px;
`;

// 댓글 영역
export const BoardHeaderUser = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const BackIcon = styled(Back)`
    vertical-align: top;
`;

export const ProfileImg = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url('/images/puppy.jpg');
    background-size: cover;
    background-position: center;
    box-sizing: border-box;
`;

export const BoardMain = styled.div`
    width: 100%;
    height: 640px;
    padding-left: 20px;
    padding-right: 20px;
`;

export const ContentSection = styled.div`
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    overflow-y: scroll; /* 스크롤 생성을 위해 수정 */

    img {
        width: 100%;
        height: auto;
        margin: 5px 0 5px 0;
    }

    .board-btn {
        display: flex;
        justify-content: space-between;
        margin: 5px 0 5px 0;
    }

    .btn-hc {
        display: flex;
    }

    .like {
        margin-right: 10px;
    }

    .user-name {
        height: 300px;
        font-size: 14px;
        font-weight: bold;
        margin: 5px 0 5px 0;
    }

    .main-content {
        margin: 5px 0 5px 0;
    }
`;

export const CommentSection = styled.section`
    width: 100%;
    height: auto;
    padding: 20px 0 25px 10px;
    margin-top: 10px;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
`;

export const CommentCounter = styled.div`
    color: ${theme.subFont};
    margin-bottom: 20px;
`;

export const BoardFooter = styled.div`
    width: 100%;
    height: 90px;
    padding: 15px 25px 15px 25px;
`;

export const CommentInput = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 15px;

    .input-text {
        width: 100%;
        margin-right: 10px;
        height: 100%;
        outline: none;
        border: none;
        background: none;
        font-size: 14px;
    }

    .comment-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        color: orange;
        width: 50px;
    }
`;
