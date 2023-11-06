import styled from 'styled-components';

export const FollowingContainer = styled.ul`
    width: 100%;
    overflow-y: auto;
`;

export const FollowingList = styled.li`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px 5px;
    border: 1px ${({ theme }) => theme.border} dashed;
    border-left: none;
    border-right: none;
    border-top: none;
    overflow-y: auto;
    .follower-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 8px;
        /* background-color: red; */
    }
`;

export const FollowingInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;
