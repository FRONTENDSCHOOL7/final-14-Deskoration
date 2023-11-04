import styled from 'styled-components';
import { ReactComponent as Backward } from '../../assets/images/Backward.svg';

export const Backwardicon = styled(Backward)``;

export const ProfileHeader = styled.div`
    display: flex;
    width: 100%;
    height: 70px;
    padding-top: 20px;
    margin: 0 25px;

    font-size: 24px;
    align-items: center;
`;
export const ProfileContainer = styled.div`
    width: 100%;
    height: 640px;
    /* padding: 10px 25px 0px 25px; */
    overflow-y: auto;

    .gradient_btn {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
`;

export const UserInfo = styled.div`
    height: max-content;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;

    .user-img {
        width: 80px;
        height: 80px;
        border-radius: 100%;
        margin-right: 8px;
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
        color: ${props => props.theme.subFont};
        width: 215px;
        /* border: 1px solid ${props => props.theme.border};  */
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
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: auto;
    height: auto;
    color: ${({ theme }) => theme.mainFont};
    overflow-y: hidden;

    /* &::-webkit-scrollbar {
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
    } */

    img {
        width: 50%;
        height: 50%;
        box-sizing: border-box;
        transition: border 0.1s ease;
        &:hover {
            border: 3px solid ${({ theme }) => theme.main};
        }
        border: 3px solid #fff;
        border-radius: 10px;
    }
`;
