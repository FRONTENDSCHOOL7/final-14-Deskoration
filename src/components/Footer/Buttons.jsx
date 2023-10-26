import React from 'react';
import * as S from './Footer.styled';
import { ReactComponent as Home } from '../../assets/images/Home.svg';
import { ReactComponent as Feed } from '../../assets/images/Feed.svg';
import { ReactComponent as Add } from '../../assets/images/Add.svg';
import { ReactComponent as Chat } from '../../assets/images/Chat.svg';
import { ReactComponent as User } from '../../assets/images/User.svg';

const mainColor = '#45522b';
const basicColor = '#0f0f0f';

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

const getColor = (name, active, hover) => {
    return active === name ? mainColor : hover[name] ? mainColor : basicColor;
};

export const HomeBtn = ({ hover, setHover, active, setActive }) => {
    return (
        <S.IconButton
            type="button"
            name="home"
            $active={active === 'home'}
            onMouseEnter={event =>
                handleMouseEnter(event.currentTarget.name, setHover)
            }
            onMouseLeave={event =>
                handleMouseLeave(event.currentTarget.name, setHover)
            }
            onClick={event => {
                handleActive(event.currentTarget.name, setActive);
            }}
        >
            <Home stroke={getColor('home', active, hover)} />
            <S.IconName $hover={hover.home} $active={active === 'home'}>
                홈
            </S.IconName>
        </S.IconButton>
    );
};

export const FeedBtn = ({ hover, setHover, active, setActive }) => {
    return (
        <S.IconButton
            type="button"
            name="feed"
            $active={active === 'feed'}
            onMouseEnter={event =>
                handleMouseEnter(event.currentTarget.name, setHover)
            }
            onMouseLeave={event =>
                handleMouseLeave(event.currentTarget.name, setHover)
            }
            onClick={event => {
                handleActive(event.currentTarget.name, setActive);
            }}
        >
            <Feed stroke={getColor('feed', active, hover)} />
            <S.IconName $hover={hover.browse} $active={active === 'feed'}>
                피드
            </S.IconName>
        </S.IconButton>
    );
};

export const AddBtn = ({ hover, setHover, active, setActive }) => {
    return (
        <S.IconButton
            type="button"
            name="add"
            $active={active === 'add'}
            onMouseEnter={event =>
                handleMouseEnter(event.currentTarget.name, setHover)
            }
            onMouseLeave={event =>
                handleMouseLeave(event.currentTarget.name, setHover)
            }
            onClick={event => {
                handleActive(event.currentTarget.name, setActive);
            }}
        >
            <Add stroke={getColor('add', active, hover)} />
            <S.IconName $hover={hover.add} $active={active === 'add'}>
                글쓰기
            </S.IconName>
        </S.IconButton>
    );
};

export const ChatBtn = ({ hover, setHover, active, setActive }) => {
    return (
        <S.IconButton
            type="button"
            name="chat"
            $active={active === 'chat'}
            onMouseEnter={event =>
                handleMouseEnter(event.currentTarget.name, setHover)
            }
            onMouseLeave={event =>
                handleMouseLeave(event.currentTarget.name, setHover)
            }
            onClick={event => {
                handleActive(event.currentTarget.name, setActive);
            }}
        >
            <Chat fill={getColor('chat', active, hover)} />
            <S.IconName $hover={hover.chat} $active={active === 'chat'}>
                채팅
            </S.IconName>
        </S.IconButton>
    );
};

export const UserBtn = ({ hover, setHover, active, setActive }) => {
    return (
        <S.IconButton
            type="button"
            name="user"
            $active={active === 'user'}
            onMouseEnter={event =>
                handleMouseEnter(event.currentTarget.name, setHover)
            }
            onMouseLeave={event =>
                handleMouseLeave(event.currentTarget.name, setHover)
            }
            onClick={event => {
                handleActive(event.currentTarget.name, setActive);
            }}
        >
            <User stroke={getColor('user', active, hover)} />
            <S.IconName $hover={hover.user} $active={active === 'user'}>
                프로필
            </S.IconName>
        </S.IconButton>
    );
};
