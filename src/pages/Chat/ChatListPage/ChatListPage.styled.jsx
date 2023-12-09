import styled from 'styled-components';
import { ReactComponent as Backward } from '../../../assets/images/Backward.svg';
import { ReactComponent as Search } from '../../../assets/images/Search.svg';

export const Backwardicon = styled(Backward)``;
export const Searchicon = styled(Search)`
    width: 26px;
    height: 26px;
`;

export const ChatListPageContainer = styled.div`
    position: relative;
`;

export const ChatListHeader = styled.div`
    display: flex;
    margin: 0 25px;
    width: 310px;
    height: 70px;
    padding-top: 20px;
    font-size: 24px;
    align-items: center;
`;

export const ChatlistPageMain = styled.div`
    width: 100%;
`;

export const SearchBar = styled.div`
    width: 100%;
    padding: 10px;
    background-color: ${props => props.theme.bgSecondary};
    border: none;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
`;

export const Searchmark = styled.div`
    margin: auto;
`;

export const SearchUsernameInput = styled.input`
    margin: auto;
    width: 244px;
    height: 24px;
    border: none;
    outline: none;
    background-color: ${props => props.theme.bgSecondary};
`;

export const UserChatList = styled.ul`
    width: 100%;
    height: 580px;
    overflow: auto;
`;

export const UserChatRoom = styled.div`
    /* width: 310px; */
    height: 70px;
    /* margin: 0 25px; */
    display: flex;
    align-items: center;

    .user-img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        margin-right: 8px;
        border: 1px solid ${props => props.theme.border};
        object-fit: cover;
    }
`;

export const UserSimpleinfo = styled.div`
    flex-grow: 1;
    .user-name {
        font-size: 14px;
        font-weight: 700;
        color: ${props => props.theme.mainFont};
        margin-bottom: 5px;
    }

    .user-msg-time {
        /* width: 240px; */
        font-size: 12px;
        display: flex;
        justify-content: space-between;
    }

    .user-lastMeassage {
        color: ${props => props.theme.subFont};
        white-space: nowrap;
        /* 긴 텍스트를 한 줄로 표시 */
        overflow: hidden;
        /* 너비를 넘는 부분은 숨김 */
        text-overflow: ellipsis;
        /* 넘치는 부분을 ...으로 표시 */
        width: 200px;
    }

    .user-date {
        color: ${props => props.theme.subFont};
    }
`;

export const NoResultParagraph = styled.p`
    color: ${props => props.theme.subFont};
    text-align: center;
`;

// 별개 css
