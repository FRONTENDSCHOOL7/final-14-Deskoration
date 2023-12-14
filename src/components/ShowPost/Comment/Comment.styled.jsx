import styled from 'styled-components';
import theme from '../../../styles/theme';
export const CommentSection = styled.section`
    padding-top: 20px;
    border-top: 1px solid #d9d9d9;
`;

export const CommentCounter = styled.div`
    color: ${theme.subFont};
    margin-bottom: 20px;
`;

export const CommentItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;

    &:last-child {
        margin-bottom: 0;
    }

    button {
        color: ${theme.subFont};
        font-size: 10px;
        padding: 10px 0 10px 10px;
    }
`;

export const CommentInfo = styled.div`
    display: flex;
    align-items: center;
    span {
        font-family: 'PreBold';
        font-size: 12px;
        margin-bottom: 5px;
    }

    p {
        width: 200px;
        font-size: 12px;
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
`;

export const CommentInputForm = styled.form`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 15px;
    border-top: 1px solid ${props => props.theme.border};
`;

export const CommentInputBox = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;

    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 15px;

    &:focus-within {
        outline: 2px solid ${theme.main};
    }

    input {
        width: 100%;
        font-size: 14px;
    }

    button {
        color: ${props => props.theme.point};
        font-weight: 700;
        width: 50px;
    }
`;

export const CommentButton = styled.button`
    padding: 5px;
`;

export const ProfileImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.border};
    background-size: cover;
    background-position: center;
    box-sizing: border-box;
    margin-right: 10px;
`;
