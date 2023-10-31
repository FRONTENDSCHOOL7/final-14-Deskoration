import { useEffect, useRef, useState } from 'react';
import GradientButton from '../../components/GradientButton/GradientButton';
import Input from '../../components/Input/Input';
import { WarningMsg } from '../../components/Input/WarningMsg';
import * as S from './RegisterForm.styled';

export const RegisterForm = ({
    handleShowRegisterForm,
    items,
    setItems,
    offset,
    state,
    setState,
}) => {
    const formRef = useRef(null);
    const categoryRef = useRef(null);
    const productNameRef = useRef(null);
    const priceRef = useRef(null);
    const storeRef = useRef(null);
    const linkRef = useRef(null);

    const [warnCatagory, setWarnCatagory] = useState(false);
    const [warnProductName, setWarnProductName] = useState(false);
    const [warnPrice, setWarnPrice] = useState(false);

    // submit 함수
    const dataSubmit = event => {
        event.preventDefault();

        const categoryValue = categoryRef.current.value;
        const productNameValue = productNameRef.current.value;
        const priceValue = priceRef.current.value;

        // input에 입력 값이 없을 경우 submit이 되지 않는다.
        if (!categoryValue || !productNameValue || !priceValue) {
            !categoryValue ? setWarnCatagory(true) : setWarnCatagory(false);
            !productNameValue
                ? setWarnProductName(true)
                : setWarnProductName(false);
            !priceValue ? setWarnPrice(true) : setWarnPrice(false);
        } else if (items.length < 5) {
            const itemIndex = items.findIndex(
                item => item.id === state?.editItem.id,
            );

            const newData = {
                category: categoryValue,
                productName: productNameValue,
                price: priceValue,
                store: storeRef.current.value,
                link: linkRef.current.value,
                id: state ? state.editItem.id : items.length,
                location: offset,
            };

            if (itemIndex !== -1) {
                const updatedData = [...items];
                updatedData[itemIndex] = {
                    ...updatedData[itemIndex],
                    ...newData,
                };
                setItems(updatedData);
            } else {
                setItems(prev => [...prev, newData]);
            }

            // 마커 컴포넌트 렌더링 여부 컨트롤
            handleShowRegisterForm();
            formRef.current.reset();
            setState(null);
        } else {
            alert('상품은 최대 5개까지 추가할 수 있습니다.');
        }
    };

    useEffect(() => {
        categoryRef.current.focus();
    }, []);

    useEffect(() => {
        categoryRef.current.value = state ? state.editItem.category : null;
        productNameRef.current.value = state && state.editItem.productName;
        priceRef.current.value = state && state.editItem.price;
        storeRef.current.value = state && state.editItem.store;
        linkRef.current.value = state && state.editItem.link;
    }, [state]);

    return (
        <S.RegisterForm ref={formRef} onSubmit={dataSubmit}>
            <fieldset>
                <Input
                    label="카테고리"
                    inputRef={categoryRef}
                    warning={warnCatagory}
                />
                {warnCatagory && <WarningMsg msg={'필수 정보를 입력하세요.'} />}

                <Input
                    label="상품명"
                    inputRef={productNameRef}
                    warning={warnProductName}
                />
                {warnProductName && (
                    <WarningMsg msg={'필수 정보를 입력하세요.'} />
                )}

                <Input
                    label="구매가격"
                    inputRef={priceRef}
                    warning={warnPrice}
                />
                {warnPrice && <WarningMsg msg={'필수 정보를 입력하세요.'} />}

                <Input label="구매처" inputRef={storeRef} />
                <Input label="구매링크" inputRef={linkRef} />
            </fieldset>
            <S.RegisterButtonBox>
                <GradientButton
                    width={'40%'}
                    padding={'12px'}
                    onClick={handleShowRegisterForm}
                >
                    취소하기
                </GradientButton>
                <GradientButton gra={'true'} type={'submit'} width={'40%'}>
                    등록하기
                </GradientButton>
            </S.RegisterButtonBox>
        </S.RegisterForm>
    );
};
