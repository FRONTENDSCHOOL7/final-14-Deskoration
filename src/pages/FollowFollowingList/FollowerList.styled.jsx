import styled from 'styled-components';
import { ReactComponent as Backward } from '../../assets/images/Backward.svg';

export const Backwardicon = styled(Backward)``;

export const FollowerHeader = styled.header`
    display: flex;
    width: 310px;
    height: 70px;
    padding-top: 20px;
    margin: 0 25px;

    font-size: 24px;
    align-items: center;
`;

export const FollwerContainer = styled.ul`
    width: 100%;
    overflow-y: auto;
`;

export const FollwerList = styled.li`
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

export const FollowerInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;
