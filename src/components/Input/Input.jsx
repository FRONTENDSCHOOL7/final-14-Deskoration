import React from 'react';
import * as S from './Input.styled';
import { useEffect } from 'react';

const Input = props => {
    const { label, inputRef, type, warning, placeholder } = props;

    return (
        <>
            <S.InputLabel htmlFor={label}>{label}</S.InputLabel>
            <S.InputText
                id={label}
                type={type}
                ref={inputRef}
                className={warning ? 'warning' : null}
                placeholder={placeholder}
            />
        </>
    );
};

const SelectInput = ({ label, inputRef, warning, options }) => {
    return (
        <>
            <S.InputLabel htmlFor={label}>{label}</S.InputLabel>
            <S.Select
                name="cate"
                id={label}
                ref={inputRef}
                className={warning ? 'warning' : null}
            >
                {options.map((option, index) => {
                    return (
                        <option value={option} key={index}>
                            {option}
                        </option>
                    );
                })}
            </S.Select>
        </>
    );
};

export { Input, SelectInput };
