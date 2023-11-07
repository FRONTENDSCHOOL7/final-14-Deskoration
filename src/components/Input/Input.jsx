import React from 'react';
import * as S from './Input.styled';

const Input = props => {
    const { label, inputRef, type, warning, placeholder, readonly, step } =
        props;

    return (
        <>
            <S.InputLabel htmlFor={label}>{label}</S.InputLabel>
            <S.InputText
                id={label}
                type={type}
                ref={inputRef}
                className={warning ? 'warning' : null}
                placeholder={placeholder}
                readOnly={readonly}
                step={step}
            />
        </>
    );
};

const SelectInput = ({ label, inputRef, warning, options, readonly }) => {
    const handleMouseDown = event => {
        event.preventDefault();
    };
    return (
        <>
            <S.InputLabel htmlFor={label}>{label}</S.InputLabel>
            <S.Select
                name="cate"
                id={label}
                ref={inputRef}
                className={warning ? 'warning' : null}
                onMouseDown={readonly ? handleMouseDown : null}
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
