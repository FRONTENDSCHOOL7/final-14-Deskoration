import styled, { css } from 'styled-components';
import { ReactComponent as More } from '../../assets/images/Dots_vertical.svg';
import { ReactComponent as Like } from '../../assets/images/Like.svg';
import { ReactComponent as Comment } from '../../assets/images/Comment.svg';

export const FeedContainer = styled.article`
    display: flex;
    width: 100%;
    margin: 20px 0;
    .profile-img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        border: 1px solid ${props => props.theme.border};
        margin: 0 10px;
        flex-shrink: 0;
    }
`;

export const ContentBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const UserInfoBox = styled.div`
    display: flex;
    justify-content: space-between;

    .user-name {
        font-weight: 700;
    }

    .user-id {
        color: ${props => props.theme.subFont};
    }
`;

export const MoreIcon = styled(More)`
    width: 24px;
    height: 24px;
    transform: rotate(90deg);
`;

export const FeedDetailBox = styled.div`
    p {
        margin-bottom: 16px;
    }
    img {
        margin-bottom: 16px;
    }
`;

export const BtnBox = styled.div`
    button {
        margin-right: 10px;
    }
`;

export const LikeIcon = styled(Like)`
    width: 26px;
    height: 26px;
    &.like {
        path {
            fill: ${props => props.theme.repo.open};
            stroke: ${props => props.theme.repo.open};
        }
    }
`;
export const CommentIcon = styled(Comment)`
    width: 26px;
    height: 26px;
`;

export const FeedDate = styled.p`
    font-size: ${props => props.theme.fontSize.sm};
    color: ${props => props.theme.subFont};
`;
