import React, { useState, useEffect, useRef } from 'react';
import * as S from './ChatRoomPage.styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyProfileAPI } from '../../../service/profile_service';
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

const ChatRoomPage = () => {
    const location = useLocation();
    const { register, handleSubmit, resetField } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            chatMsg: '',
        },
    });
    const chatContainerRef = useRef(null); // Ref를 생성하여 채팅 컨테이너에 접근
    const { roomId, user } = location.state;
    const [chatMessages, setChatMessages] = useState([]);

    const queryClient = useQueryClient();
    const myProfileData = queryClient.getQueryData(['getMyProfile']);
    const myProfileAccountName = myProfileData?.user?.accountname;
    const profileImageData = myProfileData?.user?.image;
    const myProfileUserName = myProfileData?.user?.username;

    // myProfileData를 불러올 수 없을경우 useQuery로 데이터 불러옴
    const { data: profileData } = useQuery({
        queryKey: ['getMyProfile'],
        queryFn: () => getMyProfileAPI(),
        select: data => data.user,
        enabled: !myProfileData,
    });
    const myAccountName = myProfileAccountName || profileData.accountname;
    const myProfileImage = profileImageData || profileData.image;
    const myUserName = myProfileUserName || profileData.username;
    const navigate = useNavigate();
    const [chatId, setChatId] = useState('');
    const chatCollectionRef = collection(db, 'messages');
    const chatListCollectionRef = collection(db, 'chatList');
    const chatRoomsCollectionRef = collection(db, 'rooms');
    // useEffect를 사용하여 스크롤을 항상 맨 아래로 이동
    useEffect(() => {
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
                const chatContainer = chatContainerRef.current;
                chatContainer.scrollTop = chatContainer.scrollHeight;
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        const unsubscribe = onSnapshot(chatCollectionRef, snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'modified' || change.type === 'added') {
                    if (change.doc.data().roomId === roomId)
                        setChatMessages(change.doc.data().messages);
                    chatContainerRef.current.scrollTop =
                        chatContainerRef.current.scrollHeight;
                }
            });
        });

        return () => unsubscribe();
    }, [roomId, chatContainerRef]);

    const handleSendMessage = async data => {
        // 빈 메세지 전송 시 경고
        if (data.chatMsg.trim() === '') {
            alert('메세지를 입력하세요.');
            return;
        }
        // 새 메시지를 생성
        const newMessage = {
            content: data.chatMsg,
            createdAt: new Date(),
            accountname: myAccountName,
        };

        const participants = {
            image: user.image,
            accountname: user.accountname,
            username: user.username,
        };
        const participants2 = {
            image: myProfileImage,
            accountname: myAccountName,
            username: myUserName,
        };

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
                    participants: arrayUnion(participants, participants2),
                });
            } else {
                const newChatList = await addDoc(chatListCollectionRef, {
                    createdAt: new Date(),
                    lastMessage: newMessage.content,
                    participants: arrayUnion(participants, participants2),
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
                    state: { roomId: newChatList.id, user: participants },
                    replace: true,
                });
            }
        } catch (error) {
            console.error('Error adding message: ', error);
        }
        // 메시지 입력 필드 초기화
        resetField('chatMsg');
    };

    const formatDate = data => {
        const convertedDate = data.toDate();
        const hour = convertedDate.getHours();
        const min = convertedDate.getMinutes();

        return `${hour}:${
            min === 0 ? '00' : min > 0 && min < 10 ? '0' + min : min
        }`;
    };

    usePageHandler('user', user.image, user.username, user.accountname);

    return (
        <>
            <S.ChatRoomPageContainer>
                <S.ChatRoomMain ref={chatContainerRef}>
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
