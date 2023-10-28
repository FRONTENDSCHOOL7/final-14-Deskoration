import styled from 'styled-components';

export const ChatRoomPageContainer = styled.div`
    position: relative;
`;
export const ChatRoomHeader = styled.div`
    display: flex;
    width: 310px;
    height: 70px;
    padding-top: 20px;
    margin: 0 25px;

    font-size: 24px;
    align-items: center;

    .user-img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        margin-left: 8px;
        margin-right: 8px;
    }
`;

export const ChatRoomMain = styled.div`
    width: 100%;
    height: 640px;
    padding-top: 20px;
    overflow-y: scroll; /* 세로 스크롤을 활성화합니다. */

    .userChat-img {
        width: 36px;
        height: 36px;
        border-radius: 100%;
        margin-left: 8px;
        margin-right: 8px;
    }
`;

export const ChatContent = styled.div`
    display: flex;
    margin: 0 25px 10px;
    justify-content: ${props =>
        props.issentbyuser === 'true' ? 'flex-end' : 'flex-start'}; // 문자열 비교
    margin-top: 10px;
    .my-time {
        display: flex;
        justify-content: ${props =>
            props.issentbyuser === 'true' ? 'flex-end' : 'flex-start'}; // 문자열 비교
    }
`;

export const ChatBubble = styled.div`
    max-width: 220px;
    background-color: ${props =>
        props.issentbyuser === 'true' ? '#ECEBEB' : '#FFFFFF'}; // 문자열 비교
    border: ${props =>
        props.issentbyuser === 'true' ? '#ECEBEB' : '1px solid gray'}; // 문자열 비교
    border-radius: ${props =>
        props.issentbyuser === 'true'
            ? '15px 0 15px 15px'
            : '0 15px 15px 15px'}; // 문자열 비교
    color: black; /* 말풍선 텍스트 색상 */
    padding: 10px 20px; /* 말풍선 안의 여백 */
    margin: 5px 0; /* 말풍선 간격 설정 */
`;


export const ChatRoomPageFooter = styled.div`
    width: 360px;
    height: 90px;
    border-top: 1px solid black;
`;

export const ChatInput = styled.div`
    width: 360px;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 25px 25px 25px;

    .chat-input {
        width: 225px;
        height: 40px;
        border: none;
        outline: none;
        background-color: #dbdbdb;
        border-radius: 20px;
        padding-left: 20px;
    }

    .chat-send {
        width: 30px;
        height: 30px;
    }
`;
