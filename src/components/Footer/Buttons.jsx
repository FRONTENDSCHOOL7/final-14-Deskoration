import React from 'react';
import * as S from './Footer.styled';

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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="26"
                viewBox="0 0 23 26"
                fill="none"
            >
                <path
                    d="M1 9.4L11.5 1L22 9.4V22.6C22 23.2365 21.7542 23.847 21.3166 24.2971C20.879 24.7471 20.2855 25 19.6667 25H3.33333C2.71449 25 2.121 24.7471 1.68342 24.2971C1.24583 23.847 1 23.2365 1 22.6V9.4Z"
                    stroke={
                        clicked ? mainColor : hover ? mainColor : basicColor
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
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
            <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12.8143 12.8137C12.159 13.469 12.159 14.531 12.8143 15.1857C13.469 15.841 14.5315 15.841 15.1862 15.1857C15.8415 14.5305 15.8415 13.4685 15.1862 12.8137C14.531 12.159 13.469 12.159 12.8143 12.8137ZM14 1C6.82012 1 1 6.82012 1 14C1 21.1799 6.82012 27 14 27C21.1799 27 27 21.1799 27 14C27 6.82012 21.1799 1 14 1ZM20.6122 8.76069L17.1541 16.3274C16.9868 16.6934 16.6934 16.9868 16.3274 17.1541L8.76121 20.6122C7.88843 21.0111 6.98891 20.1116 7.38782 19.2388L10.8465 11.6721C11.0137 11.3061 11.3072 11.0127 11.6731 10.8454L19.2393 7.3873C20.1121 6.98891 21.0111 7.8879 20.6122 8.76069Z"
                    stroke={
                        clicked ? mainColor : hover ? mainColor : basicColor
                    }
                    strokeWidth="2"
                />
            </svg>
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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
            >
                <rect
                    x="3.75"
                    y="3.75"
                    width="22.5"
                    height="22.5"
                    rx="3"
                    stroke={
                        clicked ? mainColor : hover ? mainColor : basicColor
                    }
                    strokeWidth="2"
                />
                <path
                    d="M15 10V20"
                    stroke={
                        clicked ? mainColor : hover ? mainColor : basicColor
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M10 15L20 15"
                    stroke={
                        clicked ? mainColor : hover ? mainColor : basicColor
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
            >
                <g clipPath="url(#clip0_86_977)">
                    <path
                        d="M26.25 26.625C26.25 25.5 30 23.25 30 20.8125C30 18 27.375 15.75 24.1875 14.8125C25.5 13.3125 26.25 11.625 26.25 9.5625C26.25 4.3125 20.8125 0 13.875 0C7.3125 0 0 3.9375 0 9.5625C0 13.5 3 16.3125 4.3125 17.4375C4.125 19.6875 3.1875 20.625 3.1875 20.625L0.9375 22.5H3.75C6.75 22.5 9.1875 21.5625 10.6875 20.4375V20.8125C10.6875 24.5625 14.8125 27.5625 20.0625 27.5625H21.1875C21.9375 28.5 24.375 30.1875 27.5625 30.1875C27.75 30 26.25 29.25 26.25 26.625ZM13.875 1.875C19.6875 1.875 24.375 5.4375 24.375 9.5625C24.375 13.6875 19.5 17.25 13.5 17.25H11.4375L11.25 17.625C10.6875 18.375 8.4375 19.875 5.4375 20.4375C5.625 19.6875 5.625 18.5625 5.625 17.0625V16.5C3.75 15 1.6875 12.375 1.6875 9.75C1.6875 5.625 7.6875 1.875 13.875 1.875Z"
                        fill={
                            clicked ? mainColor : hover ? mainColor : basicColor
                        }
                    />
                </g>
                <defs>
                    <clipPath id="clip0_86_977">
                        <rect width="30" height="30" fill="white" />
                    </clipPath>
                </defs>
            </svg>
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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
            >
                <path
                    d="M25 27.5V23.75C25 22.4239 24.4732 21.1521 23.5355 20.2145C22.5979 19.2768 21.3261 18.75 20 18.75H10C8.67392 18.75 7.40215 19.2768 6.46447 20.2145C5.52678 21.1521 5 22.4239 5 23.75V27.5"
                    stroke={
                        clicked ? mainColor : hover ? mainColor : basicColor
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 27.5H25"
                    stroke={
                        clicked ? mainColor : hover ? mainColor : basicColor
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M15 13.75C17.7614 13.75 20 11.5114 20 8.75C20 5.98858 17.7614 3.75 15 3.75C12.2386 3.75 10 5.98858 10 8.75C10 11.5114 12.2386 13.75 15 13.75Z"
                    stroke={
                        clicked ? mainColor : hover ? mainColor : basicColor
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <S.IconName hover={hover.toString()} clicked={clicked.toString()}>
                프로필
            </S.IconName>
        </S.IconButton>
    );
};
