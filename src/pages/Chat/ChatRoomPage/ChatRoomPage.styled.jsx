import styled from 'styled-components';
import { ReactComponent as Backward } from '../../../assets/images/Backward.svg';
import { ReactComponent as Send } from '../../../assets/images/Send.svg';
import { ReactComponent as Clip } from '../../../assets/images/Clip.svg';

export const Backwardicon = styled(Backward)`
    path {
        fill: ${props => props.theme.point};
    }
`;
export const Sendicon = styled(Send)`
    path {
        fill: ${props => props.theme.point};
    }
`;
export const Clipicon = styled(Clip)``;

export const ChatRoomPageContainer = styled.div`
    position: relative;
    height: 640px;
    overflow-y: scroll;
`;

export const ChatRoomMain = styled.div`
    width: 100%;
    padding-top: 20px;

    .userChat-img {
        width: 36px;
        height: 36px;
        border-radius: 100%;
        margin-right: 8px;
        border: 1px solid ${props => props.theme.border};
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
    border-top: 1px solid ${props => props.theme.border};
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 0 25px;
    background-color: #fff;
`;

export const ChatInput = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* padding: 25px 25px 25px 25px; */

    .chat-input {
        width: 250px;
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
