import React from 'react';
import * as S from './Input.styled';

const Input = props => {
    const { label, inputRef, type, warning } = props;

    return (
        <>
            <S.InputLabel htmlFor={label}>{label}</S.InputLabel>
            <S.InputText
                id={label}
                type={type}
                ref={inputRef}
                className={warning ? 'warning' : null}
            />
        </>
    );
};

export default Input;
