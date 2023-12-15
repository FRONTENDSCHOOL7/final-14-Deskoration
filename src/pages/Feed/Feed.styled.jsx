import styled, { css } from 'styled-components';
import { ReactComponent as More } from '../../assets/images/Dots_vertical.svg';
import { ReactComponent as Like } from '../../assets/images/Like.svg';
import { ReactComponent as Comment } from '../../assets/images/Comment.svg';

export const FeedContainer = styled.article`
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    flex-direction: column;
    gap: 16px;
    .profile-img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        border: 1px solid ${props => props.theme.border};
        margin-right: 10px;
        flex-shrink: 0;
        object-fit: cover;
    }
`;

export const FeedItemHeader = styled.div`
    display: flex;
    justify-content: space-between;

    > div > h4 {
        font-weight: 700;
    }

    p {
        color: ${props => props.theme.subFont};
    }
`;

export const UserInfoBox = styled.div`
    display: flex;
    align-items: center;
`;

export const FeedDetailBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    img {
        max-width: 100%;

        transition: transform 0.3s ease;
        &:hover {
            transform: scale(1.03);
        }
    }
`;

export const DetailImgBox = styled.div`
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.border};
    &:hover {
    }
`;

export const DetailMsg = styled.p`
    margin-top: 10px;
    &:hover {
        text-decoration: underline;
    }
`;

export const FeedDetailContentBox = styled.div`
    cursor: pointer;
`;

export const MoreIcon = styled(More)`
    width: 24px;
    height: 24px;
    transform: rotate(90deg);
    path {
        fill: ${props => props.theme.subFont};
        stroke: ${props => props.theme.subFont};
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
