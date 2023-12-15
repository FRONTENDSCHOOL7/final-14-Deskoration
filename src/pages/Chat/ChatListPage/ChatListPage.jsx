import React, { useState, useEffect } from 'react';
import * as S from './ChatListPage.styled';
import { Link } from 'react-router-dom';
import usePageHandler from '../../../hooks/usePageHandler';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase';

const ChatListPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [chatData, setChatData] = useState(null);
    const [searchData, setSearchData] = useState(null);
    const myAccountName = sessionStorage.getItem('AccountName');

    usePageHandler('text', '채팅');

    const filterChats = (chats, condition) => {
        return chats.reduce((acc, chat) => {
            const isMatch = chat.participants.some(condition);
            if (isMatch) acc.push(chat);
            return acc;
        }, []);
    };

    // fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                const chatCollectionRef = collection(db, 'chatList');
                const chatSnapshot = await getDocs(
                    query(chatCollectionRef, orderBy('createdAt', 'desc')),
                );
                const chatList = chatSnapshot.docs.map(doc => ({
                    roomId: doc.id,
                    ...doc.data(),
                }));

                const originList = filterChats(chatList, user =>
                    user.accountname.includes(myAccountName),
                );
                setChatData(originList);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    // 유저 검색
    useEffect(() => {
        if (searchQuery) {
            let searchArr = filterChats(chatData, user =>
                user.username.includes(searchQuery),
            );
            setSearchData(searchArr);
        } else {
            setSearchData([]);
        }
    }, [chatData, searchQuery]);

    // 날짜 변환
    const formatDate = date => {
        const convertedDate = date.toDate();
        const month = convertedDate.getMonth() + 1;
        const day = convertedDate.getDate();

        return `${month}.${day}`;
    };

    // 채팅목록 렌더링
    const renderChatList = chatList => {
        return chatList?.map(chat => {
            // console.log(chatData);
            const filteredUser = chat.participants.filter(
                user => user.accountname !== myAccountName,
            )[0];
            // console.log(filteredUser);
            const formattedDate = formatDate(chat.createdAt);

            return (
                <li key={chat.roomId}>
                    <Link
                        to={`/chat/${chat.roomId}`}
                        state={{
                            roomId: chat.roomId,
                            user: {
                                accountname: filteredUser.accountname,
                                username: filteredUser.username,
                                image: filteredUser.image,
                            },
                        }}
                    >
                        <S.UserChatRoom>
                            <img
                                src={filteredUser.image}
                                className="user-img"
                                alt="대화 상대"
                            />
                            <S.UserSimpleinfo>
                                <h2 className="user-name">
                                    {filteredUser.username}
                                </h2>
                                <div className="user-msg-time">
                                    <p className="user-lastMeassage">
                                        {chat.lastMessage}
                                    </p>
                                    <p className="user-date">{formattedDate}</p>
                                </div>
                            </S.UserSimpleinfo>
                        </S.UserChatRoom>
                    </Link>
                </li>
            );
        });
    };

    return (
        <>
            <S.ChatListPageContainer>
                {/* 메인 부분 */}
                <S.ChatlistPageMain>
                    <S.SearchBar>
                        <S.Searchmark>
                            <S.Searchicon />
                        </S.Searchmark>
                        <S.SearchUsernameInput
                            type="text"
                            placeholder="Search user"
                            value={searchQuery}
                            onChange={event =>
                                setSearchQuery(event.target.value)
                            }
                        />
                    </S.SearchBar>

                    <S.UserChatList>
                        {!searchQuery ? (
                            renderChatList(chatData)
                        ) : searchData.length > 0 ? (
                            renderChatList(searchData)
                        ) : (
                            <S.NoResultParagraph>
                                검색 결과가 없습니다.
                            </S.NoResultParagraph>
                        )}
                    </S.UserChatList>
                </S.ChatlistPageMain>
            </S.ChatListPageContainer>
        </>
    );
};

export default ChatListPage;
