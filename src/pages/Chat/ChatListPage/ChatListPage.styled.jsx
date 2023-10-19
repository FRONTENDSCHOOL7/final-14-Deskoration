import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

export const ChatListPageContainer = styled.div`
    border: 5px solid yellow;
    width: 100%;
    height: 640px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
`;

export const ChatlistPageDiv = styled.div`
    width: 310px;
    height: 60px;
    background-color: #dbdbdb;
    border: none;
    border-radius: 30px;
    margin: 20px 25px 0 25px;
    display: flex;
    justify-content: space-around;
`;

export const SearchUsernameInput = styled.input`
    width: 244px;
    height: 24px;
    border: none;
    background-color: #dbdbdb;
    margin: 18px 16px 18px 50px;
`;

export const StyledSearchIcon = styled(FiSearch)`
    width: 30px;
    height: 30px;
    position: relative;
    left: 41px;
    top: 50%;
    transform: translate(-50%, -50%);
`;
