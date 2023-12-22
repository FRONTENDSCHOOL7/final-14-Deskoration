import styled from 'styled-components';
import theme from '../../styles/theme';
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
        object-fit: cover;
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

        color: ${props => props.theme.mainFont};
        width: 215px;
        margin-bottom: 10px;
    }
`;

export const UserDataList = styled.div`
    width: 100%;
    height: 80px;
    margin: 20px 0;
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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
    grid-gap: 10px;
    margin-top: 10px;
    color: ${({ theme }) => theme.mainFont};

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }

    a {
        aspect-ratio: 1/1;
        max-width: 280px;
        max-height: 280px;
    }
    img {
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        transition: border 0.1s ease;
        &:hover {
            border: 3px solid ${theme.main};
        }
        border: 1px solid ${theme.border};
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

export const ToggleButton = styled.button`
    color: ${({ theme }) => theme.subFont};
    padding-left: 4px;
    font-weight: 700;
`;
