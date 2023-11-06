import React, { useState } from 'react';
import * as S from './ChatListPage.styled';
import { profile } from '../../../mock/mockData';
import { Link } from 'react-router-dom';
import usePageHandler from '../../../hooks/usePageHandler';

const ChatListPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const filteredProfiles = profile.filter(profile =>
        profile.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    usePageHandler('text', '채팅');

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
                        {filteredProfiles.map((profile, index) => (
                            <li key={profile._id}>
                                <Link
                                    to={`/chat/${profile.username}`}
                                    state={{
                                        user: profile.username,
                                        message: [profile.messages],
                                        image: profile.image,
                                    }}
                                >
                                    <S.UserChatRoom>
                                        <img
                                            src={profile.image}
                                            className="user-img"
                                            alt=""
                                        />
                                        <S.UserSimpleinfo>
                                            <h2 className="user-name">
                                                {profile.username}
                                            </h2>
                                            <div className="user-msg-time">
                                                <p className="user-lastMeassage">
                                                    {
                                                        profile.messages[
                                                            profile.messages
                                                                .length - 1
                                                        ]
                                                    }
                                                </p>
                                                <p className="user-date">{`${month}.${day}`}</p>
                                            </div>
                                        </S.UserSimpleinfo>
                                    </S.UserChatRoom>
                                </Link>
                            </li>
                        ))}
                    </S.UserChatList>
                </S.ChatlistPageMain>
            </S.ChatListPageContainer>
        </>
    );
};

export default ChatListPage;
