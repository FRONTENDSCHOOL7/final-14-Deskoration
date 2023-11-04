import styled from 'styled-components';
import { ReactComponent as Backward } from '../../../assets/images/Backward.svg';
import { ReactComponent as Send } from '../../../assets/images/Send.svg';
import { ReactComponent as Clip } from '../../../assets/images/Clip.svg';

export const Backwardicon = styled(Backward)``;
export const Sendicon = styled(Send)``;
export const Clipicon = styled(Clip)``;

export const ChatRoomPageContainer = styled.div`
    position: relative;
`;
export const ChatRoomHeader = styled.div`
    display: flex;
    width: 310px;
    height: 70px;
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
    /* margin: 0 25px 10px; */
    justify-content: ${props =>
        props.$issentbyuser === 'true'
            ? 'flex-end'
            : 'flex-start'}; // 문자열 비교
    margin-top: 10px;
    .my-time {
        display: flex;
        justify-content: ${props =>
            props.$issentbyuser === 'true'
                ? 'flex-end'
                : 'flex-start'}; // 문자열 비교
    }
`;

export const ChatBubble = styled.div`
    max-width: 220px;
    background-color: ${props =>
        props.$issentbyuser === 'true'
            ? props.theme.bgSecondary
            : '#FFFFFF'}; // 문자열 비교
    border: ${props =>
        props.$issentbyuser === 'true'
            ? props.theme.bgSecondary
            : `1px solid ${props.theme.border}`}; // 문자열 비교
    border-radius: ${props =>
        props.$issentbyuser === 'true'
            ? '15px 0 15px 15px'
            : '0 15px 15px 15px'}; // 문자열 비교
    color: ${props => props.theme.mainFont}; /* 말풍선 텍스트 색상 */
    padding: 10px 20px; /* 말풍선 안의 여백 */
    margin: 5px 0; /* 말풍선 간격 설정 */
`;

export const ChatRoomPageFooter = styled.div`
    width: 100%;
    height: 85px;
    border-top: 1px solid black;
`;

export const ChatInput = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 25px 25px 25px 25px; */

    .chat-input {
        width: 225px;
        height: 40px;
        border: none;
        outline: none;
        background-color: ${props => props.theme.border};
        border-radius: 20px;
        padding-left: 20px;
    }

    .chat-send {
        width: 30px;
        height: 30px;
    }
`;

export const ChatTime = styled.p`
    font-size: ${props => props.theme.fontSize.sm};
    color: ${props => props.theme.subFont};
`;
