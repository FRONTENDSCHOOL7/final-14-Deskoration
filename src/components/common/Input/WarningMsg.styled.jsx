import styled from 'styled-components';

export const Warning = styled.strong`
    display: block;
    font-size: 10px;
    color: ${({ theme }) => theme.repo.open};
    margin-bottom: 10px;
`;
