import React, { useState, useEffect } from 'react';
import * as S from './ChatListPage.styled';
import { Link } from 'react-router-dom';
import usePageHandler from '../../../hooks/usePageHandler';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

const ChatListPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [chatData, setChatData] = useState(null);
    const myId = sessionStorage.getItem('AccountName');

    usePageHandler('text', '채팅');

    useEffect(() => {
        getDocs(collection(db, 'chatList'))
            .then(snapshot => {
                const chatList = snapshot.docs.map(doc => ({
                    roomId: doc.id,
                    ...doc.data(),
                }));
                setChatData(chatList);
                console.log(chatList);
            })
            .catch(error => console.error(error));
    }, []);

    const formatDate = date => {
        const convertedDate = date.toDate();
        const month = convertedDate.getMonth() + 1;
        const day = convertedDate.getDate();

        return `${month}.${day}`;
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
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </S.SearchBar>

                    <S.UserChatList>
                        {chatData?.map(chat => {
                            const filteredUser = chat.participants.filter(
                                user => user.accountname !== myId,
                            )[0];

                            const formattedDate = formatDate(chat.createdAt);

                            return (
                                <li key={chat.roomId}>
                                    <Link
                                        to={`/chat/${chat.roomId}`}
                                        state={{
                                            roomId: chat.roomId,
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
                                                    <p className="user-date">
                                                        {formattedDate}
                                                    </p>
                                                </div>
                                            </S.UserSimpleinfo>
                                        </S.UserChatRoom>
                                    </Link>
                                </li>
                            );
                        })}
                    </S.UserChatList>
                </S.ChatlistPageMain>
            </S.ChatListPageContainer>
        </>
    );
};

export default ChatListPage;
