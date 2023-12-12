import React, { useState, useEffect, useRef } from 'react';
import * as S from './ChatRoomPage.styled';
import { useLocation } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import usePageHandler from '../../../hooks/usePageHandler';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase';

const ChatRoomPage = () => {
    const location = useLocation();
    const { register, handleSubmit, resetField } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            chatMsg: '',
        },
    });
    const chatContainerRef = useRef(null); // Ref를 생성하여 채팅 컨테이너에 접근

    const newData = new Date();
    let hours = newData.getHours();
    const minutes = newData.getMinutes().toString().padStart(2, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';

    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }
    const { user, message, image, roomId } = location.state;
    const [chatMessages, setChatMessages] = useState([]);
    const [firebaseMessage, setFirebaseMessage] = useState([]);
    const [participants, setParticipants] = useState([]);
    const myAccountName = sessionStorage.getItem('AccountName');
    const formattedTime = `${hours}:${minutes} ${amPm}`;
    // const [formattedTime, setFormattedTime] = useState()

    const handleSendMessage = data => {
        // 빈 메세지 전송 시 경고
        if (data.chatMsg.trim() === '') {
            alert('메세지를 입력하세요.');
        }

        // 새 메시지를 배열에 추가
        if (data.chatMsg !== '') {
            setChatMessages(prevMessages => [
                ...prevMessages,
                { text: data.chatMsg, isSentByUser: true },
            ]);

            // 메시지 입력 필드 초기화
            resetField('chatMsg');
        }
    };

    // useEffect를 사용하여 스크롤을 항상 맨 아래로 이동
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const chatCollectionRef = collection(db, 'messages');
                const chatSnapshot = await getDocs(
                    query(chatCollectionRef, orderBy('messages')),
                );
                const chatMessageList = chatSnapshot.docs.map(doc => ({
                    ...doc.data(),
                }));
                chatMessageList.map(info => {
                    if (info.roomId === roomId) {
                        setFirebaseMessage(info.messages);
                        setParticipants(info.participants);
                    }
                });
                // console.log(roomId);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    console.log(firebaseMessage);
    console.log(participants);
    console.log(myAccountName);

    const formatDate = data => {
        const convertedDate = data.toDate();
        const hour = convertedDate.getHours();
        const min = convertedDate.getMinutes();

        return `${hour}:${min > 0 ? min : '00'}`;
    };

    usePageHandler('user', image, user);

    return (
        <>
            <S.ChatRoomPageContainer>
                <S.ChatRoomMain ref={chatContainerRef}>
                    {/* 상대 채팅 */}
                    {firebaseMessage?.map((receivedMessage, index) =>
                        receivedMessage.accountname !== myAccountName ? (
                            <S.ChatContent key={index} $issentbyuser="false">
                                <img
                                    src={image}
                                    alt=""
                                    className="userChat-img"
                                />
                                <div>
                                    <S.ChatBubble $issentbyuser="false">
                                        <p>{receivedMessage.content}</p>
                                    </S.ChatBubble>
                                    <S.ChatTime>
                                        {formatDate(receivedMessage?.createdAt)}
                                    </S.ChatTime>
                                </div>
                            </S.ChatContent>
                        ) : (
                            <S.ChatContent key={index} $issentbyuser="true">
                                <div>
                                    <S.ChatBubble $issentbyuser="true">
                                        <p>{receivedMessage.content}</p>
                                    </S.ChatBubble>
                                    <S.ChatTime className="my-time">
                                        {formatDate(receivedMessage?.createdAt)}
                                    </S.ChatTime>
                                </div>
                            </S.ChatContent>
                        ),
                    )}
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
            <S.ChatInputForm onSubmit={handleSubmit(handleSendMessage)}>
                <S.ChatInputBox>
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="메세지를 입력하세요"
                        {...register('chatMsg')}
                    />
                    <button>
                        <S.Sendicon />
                    </button>
                </S.ChatInputBox>
            </S.ChatInputForm>
        </>
    );
};

export default ChatRoomPage;
