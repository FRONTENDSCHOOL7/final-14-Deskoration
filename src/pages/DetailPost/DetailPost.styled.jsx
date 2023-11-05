import styled from 'styled-components';
import { ReactComponent as Back } from '../../assets/images/Backward.svg';
import theme from '../../styles/theme';
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

    .profile-name {
        font-weight: bold;
        font-size: 16px;
    }
`;

export const BackIcon = styled(Back)`
    vertical-align: top;
`;

export const ProfileImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid black;
    background-size: cover;
    background-position: center;
    box-sizing: border-box;
    margin-right: 5px;
`;

export const BoardMain = styled.div`
    width: 100%;
    height: 640px;
`;

export const ContentSection = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
    overflow-y: scroll; /* 스크롤 생성을 위해 수정 */

    .post-img {
        width: 100%;
    }

    .post {
        position: relative;
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
        height: auto;
        font-size: 14px;
        font-weight: bold;
        margin: 5px 0 5px 0;
    }

    .main-content {
        margin: 5px 0 5px 0;
    }
    .maker {
    }
`;

export const CommentSection = styled.section`
    width: 310px;
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

export const CommentList = styled.div`
    font-size: 12px;
    width: 200px;
`;

export const AComment = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
`;

export const CommentID = styled.p`
    font-family: 'PreBold';
    font-size: 12px;
    margin-bottom: 5px;
`;

export const CommentContainer = styled.div`
    width: 100%;
    height: 90px;
    padding: 15px 25px 15px 25px;
`;

export const CommentBox = styled.div`
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
