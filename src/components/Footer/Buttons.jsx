import React from 'react';
import * as S from './Footer.styled';
import { ReactComponent as Home } from '../../assets/images/Home.svg';
import { ReactComponent as Browse } from '../../assets/images/Browse.svg';
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

export const HomeBtn = ({ hover, setHover }) => {
    return (
        <S.IconButton
            type="button"
            name="home"
            onMouseEnter={event =>
                handleMouseEnter(event.currentTarget.name, setHover)
            }
            onMouseLeave={event =>
                handleMouseLeave(event.currentTarget.name, setHover)
            }
        >
            <Home stroke={hover.home ? mainColor : basicColor} />
            <S.IconName $hover={hover.home}>홈</S.IconName>
        </S.IconButton>
    );
};

export const BrowseBtn = ({ hover, setHover }) => {
    return (
        <S.IconButton
            type="button"
            name="browse"
            onMouseEnter={event =>
                handleMouseEnter(event.currentTarget.name, setHover)
            }
            onMouseLeave={event =>
                handleMouseLeave(event.currentTarget.name, setHover)
            }
        >
            <Browse stroke={hover.browse ? mainColor : basicColor} />
            <S.IconName $hover={hover.browse}>피드</S.IconName>
        </S.IconButton>
    );
};

export const AddBtn = ({ hover, setHover }) => {
    return (
        <S.IconButton
            type="button"
            name="add"
            onMouseEnter={event =>
                handleMouseEnter(event.currentTarget.name, setHover)
            }
            onMouseLeave={event =>
                handleMouseLeave(event.currentTarget.name, setHover)
            }
        >
            <Add stroke={hover.add ? mainColor : basicColor} />
            <S.IconName $hover={hover.add}>글쓰기</S.IconName>
        </S.IconButton>
    );
};

export const ChatBtn = ({ hover, setHover }) => {
    return (
        <S.IconButton
            type="button"
            name="chat"
            onMouseEnter={event =>
                handleMouseEnter(event.currentTarget.name, setHover)
            }
            onMouseLeave={event =>
                handleMouseLeave(event.currentTarget.name, setHover)
            }
        >
            <Chat fill={hover.chat ? mainColor : basicColor} />
            <S.IconName $hover={hover.chat}>채팅</S.IconName>
        </S.IconButton>
    );
};

export const UserBtn = ({ hover, setHover }) => {
    return (
        <S.IconButton
            type="button"
            name="user"
            onMouseEnter={event =>
                handleMouseEnter(event.currentTarget.name, setHover)
            }
            onMouseLeave={event =>
                handleMouseLeave(event.currentTarget.name, setHover)
            }
        >
            <User stroke={hover.user ? mainColor : basicColor} />
            <S.IconName $hover={hover.user}>프로필</S.IconName>
        </S.IconButton>
    );
};
