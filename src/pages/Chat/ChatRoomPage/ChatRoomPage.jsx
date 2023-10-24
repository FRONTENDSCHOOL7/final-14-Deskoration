import React from 'react';
import * as S from './ChatRoomPage.styled';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ChatRoomPage = () => {
    const location = useLocation();

    // props를 받습니다.
    const { username } = useParams();

    // ChatListPage.js에서 전달한 데이터를 가져옵니다.
    const { user, lastMessage, image /* 다른 데이터 필드 */ } = location.state;

    return (
        <>
            <S.ChatRoomPageContainer>
                <S.ChatListHeader>
                    {/* header button 가져오기 */}
                    <button>
                        <img src="/images/icon-backward.jpg" alt="" />
                    </button>
                    <h2>
                        <img src={image} alt="" className="user-img" />
                        {username}
                    </h2>
                </S.ChatListHeader>
            </S.ChatRoomPageContainer>
        </>
    );
};

export default ChatRoomPage;

// <h2>Chat Room for {username}</h2>
//             <div>
//                 <p>Username: {user}</p>
//                 <p>Last Message: {lastMessage}</p>
//                 {/* 다른 데이터 필드 표시 */}
//             </div>
