import styled from 'styled-components';

export const ProductRegisterForm = styled.form`
    width: 100%;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export const InputLabel = styled.label`
    display: inline-block;
    color: #767676;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 10px;
`;

export const InputText = styled.input`
    width: 100%;
    padding: 2.5px;
    border-style: none;
    border-bottom: 1px solid #dbdbdb;
    margin-bottom: 10px;

    &:focus {
        outline: none;
        border-bottom: 1px solid #0f0f0f;
    }
`;

export const RegisterButton = styled.button`
    width: 90px;
    height: 26px;
    color: #fff;
    border-radius: 10px;
    background-color: #45522b;
`;

export const Warning = styled.strong`
    display: block;
    font-size: 10px;
    color: red;
    margin-bottom: 10px;
`;
