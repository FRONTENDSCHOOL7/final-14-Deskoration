import styled from 'styled-components';

export const ProductRegisterForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export const InputLabel = styled.label`
    display: inline-block;
    color: ${({ theme }) => theme.subFont};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 700;
    margin-bottom: 10px;
`;

export const InputText = styled.input`
    width: 100%;
    padding: 2.5px;
    border-style: none;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    margin-bottom: 10px;

    &:focus {
        outline: none;
        border-bottom: 1px solid ${({ theme }) => theme.mainFont};
    }
`;

export const RegisterButton = styled.button`
    width: 90px;
    height: 26px;
    color: #fff;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.main};
`;

export const Warning = styled.strong`
    display: block;
    font-size: 10px;
    color: ${({ theme }) => theme.repo.open};
    margin-bottom: 10px;
`;
