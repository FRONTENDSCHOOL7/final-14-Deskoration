import styled from 'styled-components';
import { ReactComponent as Back } from '../../assets/images/Backward.svg';
import theme from '../../styles/theme';

export const BoardHeader = styled.header`
    display: flex;
    justify-content: space-between;

    align-items: center;
    height: 70px;
    margin: 0 25px;
`;

export const BoardHeaderUser = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const BackIcon = styled(Back)`
    vertical-align: top;
`;

export const ProfileImg = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url('/images/puppy.jpg');
    background-size: cover;
    background-position: center;
    box-sizing: border-box;
`;

export const CommentSection = styled.section`
    width: 100%;
    padding: 20px 25px;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
`;

export const CommentCounter = styled.div`
    color: ${theme.subFont};
`;

export const Comment = styled.div``;
