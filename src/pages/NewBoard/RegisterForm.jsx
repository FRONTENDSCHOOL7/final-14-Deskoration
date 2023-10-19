import { useState } from 'react';
import * as S from './RegisterForm.styled';

export const RegisterForm = () => {
    const [data, setData] = useState({
        category: '',
        productName: '',
        price: '',
        store: '',
        link: '',
    });
    const [isEmpty, setIsEmpty] = useState(false);

    // submit 함수
    const dataSubmit = event => {
        event.preventDefault();
        console.log(data);
    };
    return (
        <>
            {/* 헤더 컴포넌트 불러올 예정 */}
            <header
                className="header"
                style={{ width: '100%', height: '70px' }}
            >
                <h4 className="title">상품 정보 입력</h4>
            </header>
            <main>
                <S.ProductRegisterForm onSubmit={dataSubmit}>
                    <fieldset>
                        <Input
                            label="카테고리"
                            value={data.category}
                            isBlank={isEmpty}
                        />
                        {<WarningMsg />}

                        <Input label="상품명" />
                        {isEmpty && <WarningMsg />}

                        <Input label="구매가격" />
                        {isEmpty && <WarningMsg />}

                        <Input label="구매처" />
                        <Input label="구매링크" />
                    </fieldset>

                    <S.RegisterButton>등록하기</S.RegisterButton>
                </S.ProductRegisterForm>
            </main>
        </>
    );
};

const Input = ({ label, isEmpty }) => {
    return (
        <>
            <S.InputLabel htmlFor={label} label={label}>
                {label}
            </S.InputLabel>
            <S.InputText id={label} isEmpty={isEmpty} />
        </>
    );
};

const WarningMsg = () => {
    return <S.Warning>필수 정보를 입력하세요.</S.Warning>;
};
