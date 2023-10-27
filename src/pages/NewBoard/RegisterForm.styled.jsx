import styled from 'styled-components';

export const ProductRegisterForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export const RegisterButton = styled.button`
    width: 90px;
    height: 26px;
    color: #fff;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.main};
`;
