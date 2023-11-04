import React, { useState, useEffect, useRef } from 'react';
import * as S from './ChatRoomPage.styled';
import { useLocation, useNavigate } from 'react-router-dom';
import usePageHandler from '../../../hooks/usePageHandler';

const ChatRoomPage = () => {
    const location = useLocation();
    const chatContainerRef = useRef(null); // Ref를 생성하여 채팅 컨테이너에 접근
    const navigate = useNavigate();

    const newData = new Date();
    let hours = newData.getHours();
    const minutes = newData.getMinutes().toString().padStart(2, '0');

    const amPm = hours >= 12 ? 'PM' : 'AM';

    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }

    const formattedTime = `${hours}:${minutes} ${amPm}`;

    const { user, message, image } = location.state;

    const [newMessage, setNewMessage] = useState(''); // 문자열로 초기화

    const [chatMessages, setChatMessages] = useState([]);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') {
            return; // 빈 메시지 전송 방지
        }

        // 새 메시지를 배열에 추가
        setChatMessages(prevMessages => [
            ...prevMessages,
            { text: newMessage, isSentByUser: true },
        ]);

        // 메시지 입력 필드 초기화
        setNewMessage('');
    };

    // useEffect를 사용하여 스크롤을 항상 맨 아래로 이동
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    usePageHandler('user', image, user);

    return (
        <>
            <S.ChatRoomPageContainer>
                <S.ChatRoomMain ref={chatContainerRef}>
                    {/* 상대 채팅 */}
                    {message[0].map((receivedMessage, index) => (
                        <S.ChatContent key={index} $issentbyuser="false">
                            <img src={image} alt="" className="userChat-img" />
                            <div>
                                <S.ChatBubble $issentbyuser="false">
                                    <p>{receivedMessage}</p>
                                </S.ChatBubble>
                                <S.ChatTime>{formattedTime}</S.ChatTime>
                            </div>
                        </S.ChatContent>
                    ))}

                    {/* 나의 채팅 */}
                    {chatMessages.map((chat, index) => (
                        <S.ChatContent key={index} $issentbyuser="true">
                            <div>
                                <S.ChatBubble $issentbyuser="true">
                                    <p>{chat.text}</p>
                                </S.ChatBubble>
                                <S.ChatTime className="my-time">
                                    {formattedTime}
                                </S.ChatTime>
                            </div>
                        </S.ChatContent>
                    ))}
                </S.ChatRoomMain>
            </S.ChatRoomPageContainer>
            <S.ChatRoomPageFooter>
                <S.ChatInput>
                    <S.Clipicon />
                    <input
                        type="text"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        className="chat-input"
                        placeholder="메세지를 입력하세요"
                    />
                    <button onClick={handleSendMessage}>
                        <S.Sendicon className="chat-send" />
                    </button>
                </S.ChatInput>
            </S.ChatRoomPageFooter>
        </>
    );
};

export default ChatRoomPage;
