import React from 'react';
import * as S from './Input.styled';

// label : input의 항목 이름
// value : onchange 이벤트로 입력한 텍스트를 저장한 state
// fn : onChange 이벤트에 들어갈 함수
// warning : 경고 메세지를 띄워야할 경우 문자열 'warning'을 props로 전달('warning'일 경우 밑줄이 빨간색)
const Input = ({ label, value, fn, warning }) => {
    return (
        <>
            <S.InputLabel htmlFor={label}>{label}</S.InputLabel>
            <S.InputText
                id={label}
                value={value}
                onChange={fn}
                className={warning}
            />
        </>
    );
};

export default Input;
