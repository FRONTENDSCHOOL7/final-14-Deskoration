import styled, { css } from 'styled-components';

export const Select = styled.select`
    display: block;
    width: 100%;
    padding: 2.5px;
    border-style: none;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    margin-bottom: 10px;

    &:focus {
        outline: none;
        border-bottom: 1px solid ${({ theme }) => theme.mainFont};
    }

    &.warning {
        border-bottom: 1px solid ${({ theme }) => theme.repo.open};
    }
    ${props =>
        props.onMouseDown &&
        css`
            -moz-appearance: none;
            -webkit-appearance: none;
            appearance: none;
        `}
`;

export const InputLabel = styled.label`
    display: inline-block;
    color: ${({ theme }) => theme.subFont};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 700;
    margin-bottom: 10px;
`;

export const InputText = styled.input.attrs(props => ({
    type: props.type || 'text',
}))`
    width: 100%;
    padding: 2.5px 0;
    border-style: none;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    margin-bottom: 10px;

    &:focus {
        outline: none;
        border-bottom: 1px solid ${({ theme }) => theme.mainFont};
    }

    &.warning {
        border-bottom: 1px solid ${({ theme }) => theme.repo.open};
    }
`;
