import styled from 'styled-components';
import { ReactComponent as Like } from '../../assets/images/Like.svg';
import { ReactComponent as Comment } from '../../assets/images/Comment.svg';

export const LikeIcon = styled(Like)`
    &.like {
        path {
            fill: ${props => props.theme.repo.open};
            stroke: ${props => props.theme.repo.open};
        }
    }
`;
export const CommentIcon = styled(Comment)`
    margin-left: 5px;
`;

export const CountSpan = styled.span`
    display: inline-block;
    padding: 8px 6px;
`;
