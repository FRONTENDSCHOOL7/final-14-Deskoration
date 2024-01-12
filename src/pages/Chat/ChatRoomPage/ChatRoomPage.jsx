import React, { useState, useEffect } from 'react';
import * as S from './ChatRoomPage.styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import usePageHandler from '../../../hooks/usePageHandler';
import {
    collection,
    getDocs,
    query,
    orderBy,
    updateDoc,
    doc,
    onSnapshot,
    arrayUnion,
    addDoc,
    setDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { useProfileQueryData } from 'hooks/useQueryData';

const ChatRoomPage = () => {
    const location = useLocation();
    const { roomId, user } = location.state;
    const [chatMessages, setChatMessages] = useState([]);
    const [chatId, setChatId] = useState('');
    const navigate = useNavigate();

    const { data: profileData } = useProfileQueryData(true);

    const myAccountName = profileData?.accountname;
    const myProfileImage = profileData?.image;
    const myUserName = profileData?.username;

    const chatCollectionRef = collection(db, 'messages');
    const chatListCollectionRef = collection(db, 'chatList');
    const chatRoomsCollectionRef = collection(db, 'rooms');

    const formatDate = data => {
        const convertedDate = data.toDate();
        const hour = convertedDate.getHours();
        const min = convertedDate.getMinutes();

        return `${hour}:${
            min === 0 ? '00' : min > 0 && min < 10 ? '0' + min : min
        }`;
    };

    const { register, handleSubmit, resetField } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            chatMsg: '',
        },
    });

    //chat message 가져오기
    const fetchData = async () => {
        try {
            const chatSnapshot = await getDocs(
                query(chatCollectionRef, orderBy('messages')),
            );

            const chatMessageList = chatSnapshot.docs.map(doc => ({
                chatId: doc.id,
                ...doc.data(),
            }));
            chatMessageList.map(info => {
                if (info.roomId === roomId) {
                    setChatMessages(info.messages);
                    setChatId(info.chatId);
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
        const unsubscribe = onSnapshot(chatCollectionRef, snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'modified' || change.type === 'added') {
                    if (change.doc.data().roomId === roomId)
                        setChatMessages(change.doc.data().messages);
                }
            });
        });
        return () => unsubscribe();
    }, [roomId]);

    //chat 관련 메소드
    const chatManager = {
        createNewMessage: function (messageContent, accountName) {
            return {
                content: messageContent,
                createdAt: new Date(),
                accountname: accountName,
            };
        },
        createParticipant: function (image, accountName, userName) {
            return {
                image,
                accountname: accountName,
                username: userName,
            };
        },
    };

    const handleSendMessage = async data => {
        // 빈 메세지 전송 시 경고
        if (data.chatMsg.trim() === '') {
            alert('메세지를 입력하세요.');
            return;
        }
        // 새 메시지를 생성
        const newMessage = chatManager.createNewMessage(
            data.chatMsg,
            myAccountName,
        );
        const participant1 = chatManager.createParticipant(
            user.image,
            user.accountname,
            user.username,
        );
        const participant2 = chatManager.createParticipant(
            myProfileImage,
            myAccountName,
            myUserName,
        );

        try {
            if (roomId !== undefined) {
                const docRef = doc(db, 'messages', chatId);
                await updateDoc(docRef, {
                    messages: arrayUnion(newMessage), // Add the new message to the existing array
                });

                const lastMsgRef = doc(db, 'chatList', roomId);
                await setDoc(lastMsgRef, {
                    createdAt: new Date(),
                    lastMessage: data.chatMsg,
                    participants: arrayUnion(participant1, participant2),
                });
            } else {
                const newChatList = await addDoc(chatListCollectionRef, {
                    createdAt: new Date(),
                    lastMessage: newMessage.content,
                    participants: arrayUnion(participant1, participant2),
                });
                await addDoc(
                    chatCollectionRef,
                    {
                        messages: [newMessage],
                        roomId: newChatList.id,
                    },
                    newChatList.id,
                );
                await addDoc(
                    chatRoomsCollectionRef,
                    {
                        participants: arrayUnion(
                            user.accountname,
                            myAccountName,
                        ),
                        roomId: newChatList.id,
                    },
                    newChatList.id,
                );
                navigate(`/chat/${newChatList.id}`, {
                    state: { roomId: newChatList.id, user: participant1 },
                    replace: true,
                });
            }
        } catch (error) {
            console.error('Error adding message: ', error);
        }
        // 메시지 입력 필드 초기화
        resetField('chatMsg');
    };

    usePageHandler('user', user.image, user.username, user.accountname);

    return (
        <>
            <S.ChatRoomPageContainer>
                <S.ChatRoomMain>
                    {/* 상대 채팅 */}
                    {roomId === undefined && (
                        <S.ChatContent
                            $issentbyuser="false"
                            className="first-conversation"
                        >
                            <S.NoResultParagraph>
                                {user.username}과 첫 대화를 시작해 보세요!
                            </S.NoResultParagraph>
                        </S.ChatContent>
                    )}
                    {chatMessages?.map((receivedMessage, index) =>
                        receivedMessage.accountname !== myAccountName ? (
                            <S.ChatContent key={index} $issentbyuser="false">
                                <img
                                    src={user.image}
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
