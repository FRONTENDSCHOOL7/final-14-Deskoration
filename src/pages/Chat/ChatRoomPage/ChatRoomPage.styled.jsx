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
    width: 30px;
    height: 30px;
    path {
        fill: ${props => props.theme.point};
    }
`;
export const Clipicon = styled(Clip)``;

export const ChatRoomPageContainer = styled.div`
    position: relative;
`;

export const ChatRoomMain = styled.div`
    width: 100%;

    .userChat-img {
        width: 26px;
        height: 26px;
        border-radius: 100%;
        margin-right: 8px;
        border: 1px solid ${props => props.theme.border};
        object-fit: cover;
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
    display: flex;
    position: relative;
    transform: translateX(1000px);
    animation: translate ease 0.6s forwards;
    @keyframes translate {
        from {
            transform: translateY(1000px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

export const ChatBubble = styled.div`
    max-width: 230px;
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
    padding: 8px 12px; /* 말풍선 안의 여백 */
    /* margin: 5px 0; 말풍선 간격 설정 */
    margin-bottom: 5px;
`;

export const ChatInputForm = styled.form`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    /* height: 85px; */
    background-color: #fff;
    border-top: 1px solid ${props => props.theme.border};
    padding: 15px;
`;

export const ChatInputBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 15px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 5px;

    &:focus-within {
        outline: 2px solid ${props => props.theme.main};
    }

    .chat-input {
        width: 100%;
    }

    button {
        width: 50px;
    }
`;

export const ChatTime = styled.p`
    font-size: ${props => props.theme.fontSize.sm};
    color: ${props => props.theme.subFont};
`;
export const NoResultParagraph = styled.p`
    color: ${props => props.theme.subFont};
    text-align: center;
    margin: 0 auto;
`;
