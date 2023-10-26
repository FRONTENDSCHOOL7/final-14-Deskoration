import React, { useRef } from 'react';
import * as S from './Input.styled';

// label : input의 항목 이름
// ref : onchange 이벤트로 입력한 텍스트를 저장한 ref 변수
// fn : onChange 이벤트에 들어갈 함수
// warning : 경고 메세지를 띄워야할 경우 문자열 'warning'을 props로 전달('warning'일 경우 밑줄이 빨간색)

// Input 컴포넌트를 가져다 사용할 컴포넌트에서 아래 예제와 같이 사용하시면 됩니다. (해당 주석과 예제는 추후 삭제 예정)

// const Example = () => {
//     const inputEl = useRef(null);
//     const [data, setData] = useState('');
//     const handleInput = event => {
//         inputEl.current = event.target.value;
//         setData(inputEl.current);
//     };

//     const handleClick = () => {
//         console.log(data);
//     }

//     return (
//         <>
//             <Input label="카테고리" $ref={inputEl} fn={handleInput} warning='warning'/>
//             <button onClick={handleClick}>버튼</button>
//         </>
//     );
// };

const Input = ({ label, $ref, fn, warning }) => {
    return (
        <>
            <S.InputLabel htmlFor={label}>{label}</S.InputLabel>
            <S.InputText
                id={label}
                ref={$ref}
                onChange={fn}
                className={warning}
            />
        </>
    );
};

export default Input;
