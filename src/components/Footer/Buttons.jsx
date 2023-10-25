import React from 'react';
import * as S from './Footer.styled';
import { ReactComponent as Home } from '../../assets/images/Home.svg';
import { ReactComponent as Browse } from '../../assets/images/Home.svg';
import { ReactComponent as Add } from '../../assets/images/Home.svg';
import { ReactComponent as Chat } from '../../assets/images/Home.svg';
import { ReactComponent as User } from '../../assets/images/Home.svg';

const mainColor = '#45522b';
const basicColor = '#0f0f0f';

export const HomeBtn = ({ hover, handleHover, handleClick, clicked }) => {
    return (
        <S.IconButton
            type="button"
            name="home"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={handleClick}
        >
            <Home stroke={mainColor} />
            <S.IconName hover={hover.toString()} clicked={clicked.toString()}>
                홈
            </S.IconName>
        </S.IconButton>
    );
};

export const BrowseBtn = ({ hover, handleHover, handleClick, clicked }) => {
    return (
        <S.IconButton
            type="button"
            name="browse"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={handleClick}
        >
            <Browse stroke={mainColor} />
            <S.IconName hover={hover.toString()} clicked={clicked.toString()}>
                피드
            </S.IconName>
        </S.IconButton>
    );
};

export const AddBtn = ({ hover, handleHover, handleClick, clicked }) => {
    return (
        <S.IconButton
            type="button"
            name="add"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={handleClick}
        >
            <Add stroke={mainColor} />
            <S.IconName hover={hover.toString()} clicked={clicked.toString()}>
                글쓰기
            </S.IconName>
        </S.IconButton>
    );
};

export const ChatBtn = ({ hover, handleHover, handleClick, clicked }) => {
    return (
        <S.IconButton
            type="button"
            name="chat"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={handleClick}
        >
            <Chat fill={mainColor} />
            <S.IconName hover={hover.toString()} clicked={clicked.toString()}>
                채팅
            </S.IconName>
        </S.IconButton>
    );
};

export const UserBtn = ({ hover, handleHover, handleClick, clicked }) => {
    return (
        <S.IconButton
            type="button"
            name="user"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={handleClick}
        >
            <User stroke={mainColor} />
            <S.IconName hover={hover.toString()} clicked={clicked.toString()}>
                프로필
            </S.IconName>
        </S.IconButton>
    );
};
