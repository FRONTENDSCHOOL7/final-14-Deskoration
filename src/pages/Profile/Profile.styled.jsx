import styled from 'styled-components';
import { ReactComponent as More } from '../../assets/images/Dots_vertical.svg';

export const ProfileContainer = styled.div`
    width: 100%;
`;

export const UserInfo = styled.div`
    width: 100%;
    height: max-content;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;

    .user-img {
        width: 80px;
        height: 80px;
        border-radius: 100%;
        margin-right: 8px;
        border: 1px solid ${props => props.theme.border};
    }
    .user-introduce {
        display: flex;
        flex-direction: column;
        padding-left: 10px;
    }

    .user-name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .user-info {
        margin-bottom: 20px;

        color: ${props => props.theme.subFont};
        width: 215px;
        margin-bottom: 10px;
    }
`;

export const UserDataList = styled.div`
    width: 100%;
    height: 80px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;

    .user-post {
        width: 80px;
        height: 80px;
        border-radius: 15px;
        gap: 5px;
        background-color: ${({ theme }) => theme.border};
        color: ${({ theme }) => theme.mainFont};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .user-follow {
        width: 80px;
        height: 80px;
        border-radius: 15px;
        gap: 5px;
        background-color: ${({ theme }) => theme.border};
        color: ${({ theme }) => theme.mainFont};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .user-following {
        width: 80px;
        height: 80px;
        border-radius: 15px;
        gap: 5px;
        background-color: ${({ theme }) => theme.border};
        color: ${({ theme }) => theme.mainFont};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export const UserPostings = styled.div`
    flex-wrap: wrap;
    justify-content: space-between;
    color: ${({ theme }) => theme.mainFont};
    overflow-y: hidden;

    img {
        width: 50%; /* Fill the available width in each column */
        box-sizing: border-box;
        transition: border 0.1s ease;
        &:hover {
            border: 3px solid ${({ theme }) => theme.main};
        }
        border: 3px solid white;
        border-radius: 10px;
    }

    &::-webkit-scrollbar {
        width: 7px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }

    &::-webkit-scrollbar-track {
        background-color: #f5f5f5;
        border-radius: 10px;
    }
`;

export const MoreButton = styled.button`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 15px;
    right: 20px;
    transform: rotate(90deg);
`;

export const MoreIcon = styled(More)`
    width: 25px;
    height: 25px;
`;
