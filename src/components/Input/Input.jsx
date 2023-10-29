import React from 'react';
import * as S from './Input.styled';

const Input = props => {
    const { inputRef, warning, label } = props;

    return (
        <>
            <S.InputLabel htmlFor={label}>{label}</S.InputLabel>
            <S.InputText
                id={label}
                type={label}
                ref={inputRef}
                className={warning ? 'warning' : null}
            />
        </>
    );
};

export default Input;
