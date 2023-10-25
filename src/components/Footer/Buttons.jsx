import React from 'react';
import * as S from './Footer.styled';
import { ReactComponent as Home } from '../../assets/images/Home.svg';
import { ReactComponent as Browse } from '../../assets/images/Browse.svg';
import { ReactComponent as Add } from '../../assets/images/Add.svg';
import { ReactComponent as Chat } from '../../assets/images/Chat.svg';
import { ReactComponent as User } from '../../assets/images/User.svg';

const mainColor = '#45522b';
const basicColor = '#0f0f0f';

export const HomeBtn = ({}) => {
    return (
        <S.IconButton type="button" name="home">
            <Home stroke={basicColor} />
            <S.IconName>홈</S.IconName>
        </S.IconButton>
    );
};

export const BrowseBtn = () => {
    return (
        <S.IconButton type="button" name="browse">
            <Browse stroke={basicColor} />
            <S.IconName>피드</S.IconName>
        </S.IconButton>
    );
};

export const AddBtn = () => {
    return (
        <S.IconButton type="button" name="add">
            <Add stroke={basicColor} />
            <S.IconName>글쓰기</S.IconName>
        </S.IconButton>
    );
};

export const ChatBtn = ({}) => {
    return (
        <S.IconButton type="button" name="chat">
            <Chat fill={basicColor} />
            <S.IconName>채팅</S.IconName>
        </S.IconButton>
    );
};

export const UserBtn = ({}) => {
    return (
        <S.IconButton type="button" name="user">
            <User stroke={basicColor} />
            <S.IconName>프로필</S.IconName>
        </S.IconButton>
    );
};
