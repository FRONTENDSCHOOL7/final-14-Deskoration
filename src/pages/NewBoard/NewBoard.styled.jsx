import styled from 'styled-components';

export const NewBoarForm = styled.form`
    display: flex;
    flex-direction: column;

    padding: 0 25px;
`;

export const FileInputButton = styled.button`
    height: 400px;
    border: 1px solid gray;
    border-radius: 14px;
    margin-bottom: 20px;

    &:hover {
        color: #fff;
        background-color: #45522b;
    }
`;

export const NewBoardTextarea = styled.textarea`
    outline: none;
    resize: none;

    height: 200px;
    border: 1px solid gray;
    border-radius: 14px;
    padding: 10px;
`;
