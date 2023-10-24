import { useState } from 'react';
import * as S from './RegisterForm.styled';

export const RegisterForm = ({
    setShowRegisterForm,
    items,
    setItems,
    data,
    setData,
    offset,
    displayStyle,
}) => {
    const [validation, setValidation] = useState({
        category: { isValid: true, isTouched: false },
        productName: { isValid: true, isTouched: false },
        price: { isValid: true, isTouched: false },
    });

    // 유효성 검사 함수
    const confirmValidation = inputName => {
        if (inputName === 'category') {
            setValidation(prev => ({
                ...prev,
                category: {
                    isValid: !!data.category,
                    isTouched: true,
                },
            }));
        }

        if (inputName === 'productName') {
            setValidation(prev => ({
                ...prev,
                productName: {
                    isValid: !!data.productName,
                    isTouched: true,
                },
            }));
        }

        if (inputName === 'price') {
            setValidation(prev => ({
                ...prev,
                price: {
                    isValid: !!data.price,
                    isTouched: true,
                },
            }));
        }
    };

    // submit 함수
    // Items에 입력 데이터를 저장
    // setShowRegisterForm 컨트롤하여 마커 컴포넌트 렌더링
    // input 요소 초기화
    const dataSubmit = event => {
        event.preventDefault();
        if (items.length < 5) {
            const newData = {
                ...data,
                id: items.length,
                location: offset,
            };
            setItems(prev => [...prev, newData]);
            setShowRegisterForm(false);
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
    };
    return (
        <>
            <S.ProductRegisterForm onSubmit={dataSubmit} style={displayStyle}>
                <fieldset>
                    <Input
                        label="카테고리"
                        value={data.category}
                        setData={setData}
                        validation={validation}
                        confirmValidation={() => confirmValidation('category')}
                    />
                    {!validation.category.isValid && <WarningMsg />}

                    <Input
                        label="상품명"
                        value={data.productName}
                        setData={setData}
                        validation={validation}
                        confirmValidation={() =>
                            confirmValidation('productName')
                        }
                    />
                    {!validation.productName.isValid && <WarningMsg />}

                    <Input
                        label="구매가격"
                        value={data.price}
                        setData={setData}
                        validation={validation}
                        confirmValidation={() => confirmValidation('price')}
                    />
                    {!validation.price.isValid && <WarningMsg />}

                    <Input
                        label="구매처"
                        value={data.store}
                        setData={setData}
                    />
                    <Input
                        label="구매링크"
                        value={data.link}
                        setData={setData}
                    />
                </fieldset>

                <S.RegisterButton
                    disabled={
                        !validation.category.isTouched ||
                        !validation.productName.isTouched ||
                        !validation.price.isTouched ||
                        !validation.category.isValid ||
                        !validation.productName.isValid ||
                        !validation.price.isValid
                    }
                >
                    등록하기
                </S.RegisterButton>
            </S.ProductRegisterForm>
        </>
    );
};

const Input = ({ label, value, setData, validation, confirmValidation }) => {
    //input값을 data에 저장하기

    const onInputChange = event => {
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

    // 필수 input 필드에 해당하는 validation 값 가져오기
    const getValidation = label => {
        switch (label) {
            case '카테고리':
                return validation.category;
            case '상품명':
                return validation.productName;
            case '구매가격':
                return validation.price;
            default:
                return 'true';
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
                onChange={onInputChange}
                onBlur={confirmValidation}
                validation={getValidation(label)}
            />
        </>
    );
};

const WarningMsg = () => {
    return <S.Warning>필수 정보를 입력하세요.</S.Warning>;
};
