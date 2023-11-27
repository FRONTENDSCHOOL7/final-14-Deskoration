import styled from 'styled-components';
import { ReactComponent as HomeFile } from '../../assets/images/Home.svg';
import { ReactComponent as FeedFile } from '../../assets/images/Feed.svg';
import { ReactComponent as AddFile } from '../../assets/images/Add.svg';
import { ReactComponent as ChatFile } from '../../assets/images/Chat.svg';
import { ReactComponent as UserFile } from '../../assets/images/User.svg';

export const HomeIcon = styled(HomeFile)`
    path {
        stroke: ${({ theme, $hover, $active }) =>
            $active ? theme.main : $hover ? theme.main : theme.mainFont};
        fill: ${({ theme, $hover, $active }) =>
            $active ? theme.main : $hover ? theme.main : '#fff'};
    }
`;
export const FeedIcon = styled(FeedFile)`
    rect {
        stroke: ${({ theme, $hover, $active }) =>
            $active ? theme.main : $hover ? theme.main : theme.mainFont};
    }
    line {
        stroke: ${({ theme, $hover, $active }) =>
            $active ? theme.main : $hover ? theme.main : theme.mainFont};
    }
`;
export const PostUploadIcon = styled(AddFile)`
    rect {
        stroke: ${({ theme, $hover, $active }) =>
            $active ? theme.main : $hover ? theme.main : theme.mainFont};
        fill: ${({ theme, $hover, $active }) =>
            $active ? theme.main : $hover ? theme.main : '#fff'};
    }
    line {
        stroke: ${({ theme, $hover, $active }) =>
            $active ? '#fff' : $hover ? '#fff' : theme.mainFont};
    }
`;
export const ChatIcon = styled(ChatFile)`
    path {
        fill: ${({ theme, $hover, $active }) =>
            $active ? theme.main : $hover ? theme.main : theme.mainFont};
    }
`;
export const ProfileIcon = styled(UserFile)`
    path {
        stroke: ${({ theme, $hover, $active }) =>
            $active ? theme.main : $hover ? theme.main : theme.mainFont};
        fill: ${({ theme, $hover, $active }) =>
            $active ? theme.main : $hover ? theme.main : '#fff'};
    }
`;

export const IconButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 48px;
    margin-bottom: 7px;
    gap: 5px;
    &::before {
        content: '';
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: ${({ theme, $hover, $active }) =>
            $active ? theme.main : $hover ? theme.main : '#fff'};
    }
`;

export const IconNameSpan = styled.span`
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme, $hover, $active }) =>
        $active ? theme.main : $hover ? theme.main : theme.mainFont};
`;
