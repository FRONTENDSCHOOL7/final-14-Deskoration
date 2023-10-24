import React, { useState } from 'react';
import * as S from './ChatListPage.styled';
import { profile } from '../../../mock/mockData';
import { Link } from 'react-router-dom';

const ChatListPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const filteredProfiles = profile.filter(profile =>
        profile.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <>
            <S.ChatListPageContainer>
                {/* 헤더 부분 */}
                <S.ChatListHeader>
                    {/* header button 가져오기 */}
                    <button>
                        <img src="/images/icon-backward.jpg" alt="" />
                    </button>
                    <h2>Chat</h2>
                </S.ChatListHeader>

                {/* 메인 부분 */}
                <S.ChatlistPageMain>
                    <S.SearchBar>
                        <S.SearchIcon>돋보기</S.SearchIcon>
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
                                        lastMessage:
                                            profile.messages[
                                                profile.messages.length - 1
                                            ],
                                        image: profile.image,
                                        // 다른 데이터 필드들도 추가
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
            {/* 푸터 부분 */}
            <S.ChatListPageFooter>
                {/* 푸터 버튼 가져오기 */}
                <div className="btn-list">
                    <button className="btn">home</button>
                    <button className="btn">feed</button>
                    <button className="btn">create</button>
                    <button className="btn">chat</button>
                    <button className="btn">profile</button>
                </div>
            </S.ChatListPageFooter>
        </>
    );
};

export default ChatListPage;
