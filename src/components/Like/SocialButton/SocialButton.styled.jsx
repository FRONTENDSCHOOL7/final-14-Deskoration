import styled from 'styled-components';

import { ReactComponent as Like } from 'assets/images/Like.svg';
import { ReactComponent as Comment } from 'assets/images/Comment.svg';

export const SocialButton = styled.button`
    margin-right: 10px;
`;

export const LikeIcon = styled(Like)`
    &.like {
        path {
            fill: ${props => props.theme.repo.open};
            stroke: ${props => props.theme.repo.open};
        }
    }
`;
export const CommentIcon = styled(Comment)``;

export const CountSpan = styled.span`
    display: inline-block;
    padding: 8px 3px 8px 6px;
`;
