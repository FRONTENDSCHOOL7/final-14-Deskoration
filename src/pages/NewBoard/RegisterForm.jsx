import { useState } from 'react';
import * as S from './RegisterForm.styled';

export const RegisterForm = ({
    handleShowRegisterForm,
    items,
    setItems,
    offset,
}) => {
    const [data, setData] = useState({
        id: '',
        location: {},
        category: '',
        productName: '',
        price: '',
        store: '',
        link: '',
    });

    const [initialAccess, setInitialAccess] = useState(true);
    // submit 함수
    const dataSubmit = event => {
        event.preventDefault();
        setInitialAccess(false);
        // input에 입력 값이 없을 경우 submit이 되지 않는다.
        if (!data.category || !data.productName || !data.price) {
            return;
        } else if (items.length < 5) {
            // Items에 입력한 데이터를 저장
            const newData = {
                ...data,
                id: items.length,
                location: offset,
            };
            setItems(prev => [...prev, newData]);
            // 마커 컴포넌트 렌더링 여부 컨트롤
            handleShowRegisterForm();
            // data 초기화
            // 여기 form 이면 차라리 formRef를 써서 초기화
            setData(prev => ({
                ...prev,
                id: '',
                location: {},
                category: '',
                productName: '',
                price: '',
                store: '',
                link: '',
            }));
        } else {
            alert('상품은 최대 5개까지 추가할 수 있습니다.');
        }

        setInitialAccess(true);
    };
    return (
        <S.ProductRegisterForm onSubmit={dataSubmit}>
            <fieldset>
                <Input
                    label="카테고리"
                    value={data.category}
                    setData={setData}
                    warning={
                        !initialAccess && !data.category ? 'warning' : null
                    }
                />
                {initialAccess ? null : !data.category && <WarningMsg />}

                <Input
                    label="상품명"
                    value={data.productName}
                    setData={setData}
                    warning={
                        !initialAccess && !data.productName ? 'warning' : null
                    }
                />
                {initialAccess ? null : !data.productName && <WarningMsg />}

                <Input
                    label="구매가격"
                    value={data.price}
                    setData={setData}
                    warning={!initialAccess && !data.price ? 'warning' : null}
                />
                {initialAccess ? null : !data.price && <WarningMsg />}

                <Input
                    label="구매처"
                    value={data.store}
                    setData={setData}
                    initialAccess={initialAccess}
                />
                <Input
                    label="구매링크"
                    value={data.link}
                    setData={setData}
                    initialAccess={initialAccess}
                />
            </fieldset>

            <S.RegisterButton>등록하기</S.RegisterButton>
        </S.ProductRegisterForm>
    );
};

const Input = ({ label, value, setData, warning }) => {
    //input값을 data에 저장하기
    const handleInputChange = event => {
        switch (label) {
            case '카테고리':
                setData(prev => ({
                    ...prev,
                    category: event.target.value,
                }));
                break;
            case '상품명':
                setData(prev => ({
                    ...prev,
                    productName: event.target.value,
                }));
                break;
            case '구매가격':
                setData(prev => ({
                    ...prev,
                    price: event.target.value,
                }));
                break;
            case '구매처':
                setData(prev => ({
                    ...prev,
                    store: event.target.value,
                }));
                break;
            case '구매링크':
                setData(prev => ({
                    ...prev,
                    link: event.target.value,
                }));
                break;
            default:
                console.log('에러');
        }
    };

    return (
        <>
            <S.InputLabel htmlFor={label} label={label}>
                {label}
            </S.InputLabel>
            <S.InputText
                id={label}
                value={value}
                onChange={handleInputChange}
                className={warning}
            />
        </>
    );
};

const WarningMsg = () => {
    return <S.Warning>필수 정보를 입력하세요.</S.Warning>;
};
