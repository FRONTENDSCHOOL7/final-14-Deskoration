import styled from 'styled-components';
import { ReactComponent as Backward } from '../../assets/images/Backward.svg';

export const Backwardicon = styled(Backward)``;

export const ProfileHeader = styled.div`
    display: flex;
    width: 310px;
    height: 70px;
    padding-top: 20px;
    margin: 0 25px;

    font-size: 24px;
    align-items: center;
`;
export const ProfileContainer = styled.div`
    width: 100%;
    height: 640px;
    padding: 10px 25px 0px 25px;
`;

export const UserInfo = styled.div`
    height: 100px;
    display: flex;
    flex-direction: row;

    .user-img {
        width: 80px;
        height: 80px;
        border-radius: 100%;
        margin-right: 8px;
    }
    .user-introduce {
        display: flex;
        flex-direction: column;
    }

    .user-name {
        font-weight: bold;
    }

    .user-info {
        height: 65px; // 텍스트 상자의 높이를 동적으로 설정
        width: 215px;
        overflow: 'hidden'; // 초과 내용 숨김
        text-overflow: ellipsis;
        border: '1px solid #ccc'; // 테두리 추가
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
    height: 360px;
    overflow: hidden;
    margin-top: 10px;
`;
