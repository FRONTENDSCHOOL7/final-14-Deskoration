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

    > button {
        color: ${theme.subFont};
        font-size: 10px;
        padding: 10px 0 10px 10px;
        display: flex;
        align-items: center;
        min-width: 28px;
    }
`;

export const CommentBox = styled.div`
    display: flex;
    width: 100%;
`;
export const CommentInfo = styled.div`
    width: 100%;
    & > button {
        width: 100%;
        color: ${theme.subFont};
        background-color: #fff;
        padding: 5px;
    }

    div {
        font-family: 'PreBold';
        font-size: 12px;
        margin-bottom: 5px;
    }

    p {
        /* width: 100%; */
        font-size: 12px;
        word-wrap: break-word;
        overflow-wrap: anywhere;
        overflow: hidden;

        height: ${props => (props.$initHeight ? '30px' : 'auto')};
        ${props => props.$clicked && 'height: auto; '};

        /* display: -webkit-box;
        -webkit-line-clamp: ${props => (props.$clicked ? '0' : '2')};
        -webkit-box-orient: vertical; */
    }
`;

export const CommentInputForm = styled.form`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 85px;
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
