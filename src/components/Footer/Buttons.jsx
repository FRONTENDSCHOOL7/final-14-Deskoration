import React from 'react';
import * as S from './Buttons.styled';
import { useNavigation } from '../../hooks/useNavigate';

const handleMouseEnter = (name, setHover) => {
    setHover(prev => ({
        ...prev,
        [name]: true,
    }));
};

const handleMouseLeave = (name, setHover) => {
    setHover(prev => ({
        ...prev,
        [name]: false,
    }));
};

const handleActive = (name, setActive) => {
    setActive(name);
};

const icons = {
    home: S.HomeIcon,
    feed: S.FeedIcon,
    postUpload: S.PostUploadIcon,
    chat: S.ChatIcon,
    profile: S.ProfileIcon,
};

const iconNames = {
    home: '홈',
    feed: '피드',
    postUpload: '글쓰기',
    chat: '채팅',
    profile: '프로필',
};

const GenericIconButton = ({ type, hover, setHover, active, setActive }) => {
    const handleNavigate = useNavigation();
    const Icon = icons[type];
    const iconName = iconNames[type];

    return (
        <S.IconButton
            type="button"
            name={type}
            $active={active === type}
            onMouseEnter={event =>
                handleMouseEnter(event.currentTarget.name, setHover)
            }
            onMouseLeave={event =>
                handleMouseLeave(event.currentTarget.name, setHover)
            }
            onClick={event => {
                handleActive(event.currentTarget.name, setActive);
                handleNavigate(`/${type}`);
            }}
        >
            <Icon $hover={hover[type]} $active={active === type} />
            <S.IconNameSpan $hover={hover[type]} $active={active === type}>
                {iconName}
            </S.IconNameSpan>
        </S.IconButton>
    );
};

export const HomeBtn = props => <GenericIconButton type="home" {...props} />;
export const FeedBtn = props => <GenericIconButton type="feed" {...props} />;
export const AddBtn = props => (
    <GenericIconButton type="postUpload" {...props} />
);
export const ChatBtn = props => <GenericIconButton type="chat" {...props} />;
export const UserBtn = props => <GenericIconButton type="profile" {...props} />;
